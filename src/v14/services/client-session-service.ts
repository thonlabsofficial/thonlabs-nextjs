import * as jose from 'jose';
import Cookies from 'js-cookie';
import { intAPI, labsPublicAPI } from '../../shared/utils/api';
import { APIResponseCodes } from '../../shared/utils/errors';
import { delay } from '../../shared/utils/helpers';
import type { User } from '../../shared/interfaces/user';

let accessToken: string = '';
let refreshPromise: Promise<string> | null = null;
let isRefreshing: boolean = false;

const ClientSessionService = {
	setIsRefreshing(value: boolean) {
		isRefreshing = value;
	},
	isValid() {
		const accessToken = Cookies.get('tl_session');

		if (!accessToken) {
			return false;
		}

		const { exp } = jose.decodeJwt(accessToken as string);
		const sessionValid = (exp as number) * 1000 > Date.now();

		return sessionValid;
	},
	async getAccessToken() {
		if (isRefreshing) {
			await delay(10000);
		}

		accessToken = Cookies.get('tl_session') || '';

		if (accessToken) {
			return accessToken;
		}

		if (!refreshPromise) {
			refreshPromise = intAPI('/api/auth/refresh', { method: 'POST' })
				.then(() => {
					accessToken = Cookies.get('tl_session') || '';
					return accessToken;
				})
				.finally(() => {
					refreshPromise = null;
				});
		}

		return refreshPromise;
	},
	redirectToLogout() {
		intAPI('/api/auth/logout', { method: 'POST' }).then(() => {
			window.location.href = `/auth/login?reason=${APIResponseCodes.SessionExpired}`;
		});
	},
	async logout() {
		await intAPI('/api/auth/logout', { method: 'POST' });
		await delay(200);
		window.location.href = '/auth/login';
	},
};

export default ClientSessionService;
