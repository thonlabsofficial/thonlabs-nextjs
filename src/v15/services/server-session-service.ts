import * as jose from 'jose';
import { cookies } from 'next/headers';
import { labsPublicAPI } from '../../shared/utils/api';
import Log from '../../shared/utils/log';
import type { SessionData } from '../../shared/interfaces/session-data';
import type { User } from '../../shared/interfaces/user';
import type { NextResponse } from 'next/server';

const ServerSessionService = {
	async create(data: SessionData) {
		if (!data) {
			return;
		}

		const { set } = await cookies();

		const expires = new Date(data.tokenExpiresIn);
		set('tl_session', data.token, {
			path: '/',
			expires,
			secure: process.env.NODE_ENV === 'production',
		});

		if (data.refreshToken) {
			set('tl_refresh', data.refreshToken, {
				path: '/',
				expires: data.refreshTokenExpiresIn,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
			});
			set('tl_keep_alive', 'true', {
				path: '/',
				expires: data.refreshTokenExpiresIn,
				secure: process.env.NODE_ENV === 'production',
			});
		}
	},

	createFromMiddleware(res: NextResponse, data: SessionData) {
		if (!res || !data) {
			return;
		}

		const expires = new Date(data.tokenExpiresIn);
		res.cookies.set('tl_session', data.token, {
			path: '/',
			expires,
			secure: process.env.NODE_ENV === 'production',
		});

		if (data.refreshToken) {
			res.cookies.set('tl_refresh', data.refreshToken, {
				path: '/',
				expires: data.refreshTokenExpiresIn,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
			});
			res.cookies.set('tl_keep_alive', 'true', {
				path: '/',
				expires: data.refreshTokenExpiresIn,
				secure: process.env.NODE_ENV === 'production',
			});
		}
	},

	async getSessionCookies() {
		const { get } = await cookies();

		return {
			accessToken: get('tl_session')?.value,
			refreshToken: get('tl_refresh')?.value,
			keepAlive: get('tl_keep_alive')?.value === 'true',
		};
	},

	async getSession() {
		const { get } = await cookies();
		const accessToken = get('tl_session');

		if (!accessToken?.value) {
			return {
				user: null,
			};
		}

		const response = await labsPublicAPI(`/auth/session`, {
			headers: {
				Authorization: `Bearer ${accessToken.value}`,
			},
		});

		if (!response.ok) {
			Log.error({
				action: 'getSession',
				message: 'Failed to get session',
				statusCode: response.status,
			});

			return {
				user: null,
			};
		}

		const user = (await response.json()) as User;

		return {
			user,
		};
	},

	async isValid() {
		const { get } = await cookies();
		const accessToken = get('tl_session');

		if (!accessToken?.value) {
			return false;
		}

		const { exp } = jose.decodeJwt(accessToken.value);
		const sessionValid = (exp as number) * 1000 > Date.now();

		return sessionValid;
	},

	async validateRefreshToken(res: NextResponse | null = null) {
		const { get } = await cookies();
		const refreshToken = get('tl_refresh');

		if (!refreshToken?.value) {
			Log.error({
				action: 'validateRefreshToken',
				message: 'Invalid refresh token',
			});

			return {
				statusCode: 401,
			};
		}

		const response = await labsPublicAPI('/auth/refresh', {
			method: 'POST',
			body: JSON.stringify({
				token: refreshToken.value,
			}),
		});
		const data = await response.json();

		Log.debug({
			action: 'validateRefreshToken',
			message: 'Refresh token data',
			data: {
				status: response.status,
				...data,
			},
		});

		if (response.status !== 201 || data.error) {
			Log.error({
				action: 'validateRefreshToken',
				message: `Response ERROR: ${data?.error || data?.message || data?.statusMessage}`,
				data: { ...data, status: response.status },
			});

			return {
				statusCode: response.status || 401,
				error: data?.error || data?.message,
			};
		}

		if (res) {
			this.createFromMiddleware(res, data.data);
		} else {
			await this.create(data.data);
		}

		return {
			statusCode: 200,
		};
	},

	async validateMagicToken(token: string) {
		const response = await labsPublicAPI(`/auth/magic/${token}`);
		const data = await response.json();

		if (data.statusCode) {
			Log.error({
				action: 'validateMagicToken',
				message: data?.error || data?.message || data?.statusMessage,
				data,
			});

			return {
				statusCode: data.statusCode,
				error: data?.error || data?.message,
			};
		}

		await this.create(data);

		return {
			statusCode: 200,
		};
	},

	async validateEmailConfirmationToken(token: string) {
		const response = await labsPublicAPI(`/auth/confirm-email/${token}`);
		const data = await response.json();

		if (data.statusCode) {
			Log.error({
				action: 'validateEmailConfirmationToken',
				message: data?.error || data?.message || data?.statusMessage,
				data,
			});

			return {
				statusCode: data.statusCode,
				error: data?.error || data?.message,
				data: { emailResent: data?.emailResent },
			};
		}

		return {
			statusCode: 200,
			...data,
		};
	},

	async shouldKeepAlive() {
		try {
			const isValid = await this.isValid();
			const { keepAlive, refreshToken } = await this.getSessionCookies();

			if (keepAlive && isValid === false) {
				if (!refreshToken) {
					Log.error({
						action: 'shouldKeepAlive',
						message: 'Invalid refresh token',
					});

					return {
						status: 'invalid_session',
					};
				}

				return {
					status: 'needs_refresh',
				};
			}

			if (!isValid) {
				Log.error({
					action: 'shouldKeepAlive',
					message: 'Invalid access token',
				});

				return {
					status: 'invalid_session',
				};
			}

			return {
				status: 'valid_session',
			};
		} catch (e: any) {
			Log.error({
				action: 'shouldKeepAlive',
				message: 'Error "shouldKeepAlive": ',
				error: e?.message,
			});

			return {
				status: 'invalid_session',
			};
		}
	},

	async logout() {
		const { delete: deleteCookie } = await cookies();
		deleteCookie('tl_session');
		deleteCookie('tl_refresh');
		deleteCookie('tl_keep_alive');
		deleteCookie('tl_env');
	},

	async validateSSOAuthentication(provider: string, token: string) {
		const response = await labsPublicAPI(`/auth/login/sso/${provider}`, {
			method: 'POST',
			body: JSON.stringify({
				token,
			}),
		});
		const data = await response.json();

		if (data.statusCode) {
			Log.error({
				action: 'validateSSOAuthentication',
				message: data?.error || data?.message || data?.statusMessage,
				data,
			});

			return {
				statusCode: data.statusCode,
				error: data?.error || data?.message,
			};
		}

		await this.create(data);

		return {
			statusCode: 200,
		};
	},
};

export default ServerSessionService;
