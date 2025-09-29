import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { authRoutes, publicRoutes } from '../../shared/utils/constants';
import { APIResponseCodes } from '../../shared/utils/errors';
import {
	forwardSearchParams,
	getURLFromHost,
} from '../../shared/utils/helpers';
import Log from '../../shared/utils/log';
import ServerSessionService from '../services/server-session-service';

interface ThonLabsMiddlewareConfig {
	accessToken?: string;
	redirect?: URL;
	res?: NextResponse;
}

export function isAuthRoute(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	const isPublicRoute = publicRoutes.some((route) =>
		pathname.startsWith(route),
	);

	return isPublicRoute;
}

export function shouldBypassRoute(req: NextRequest, routes: string[]) {
	const pathname = req.nextUrl.pathname;
	const shouldBypass = routes.some((route) => new RegExp(route).test(pathname));

	return shouldBypass;
}

export async function validateSession(
	req: NextRequest,
	bypassRoutes: string[] = [],
): Promise<ThonLabsMiddlewareConfig> {
	if (
		shouldBypassRoute(req, [
			'^/api/auth',
			'/.well-known/appspecific/com.chrome.devtools.json',
			...bypassRoutes,
		])
	) {
		return {
			redirect: new URL('/bypass', req.url),
		};
	}

	const isPublicRoute = isAuthRoute(req);
	const res = NextResponse.next();

	if (!isPublicRoute) {
		const { accessToken, refreshToken, keepAlive } =
			await ServerSessionService.getSessionCookies();

		// Validates the access token or access token and refresh token
		// based on keep alive
		if (
			(!keepAlive && !accessToken) ||
			(keepAlive && !accessToken && !refreshToken)
		) {
			Log.info({
				action: 'validateSession',
				message: 'ThonLabs Validate Session: Invalid session',
			});
			return {
				redirect: forwardSearchParams(req, '/auth/logout', {
					reason: APIResponseCodes.SessionExpired.toString(),
				}),
			};
		}

		// Validates the session status and redirects to regenerate
		// a new token in case of need
		const { status } = await ServerSessionService.shouldKeepAlive();

		if (status === 'invalid_session') {
			Log.info({
				action: 'validateSession',
				message: { pathname: req.nextUrl.pathname },
			});
			Log.info({
				action: 'validateSession',
				message: 'ThonLabs Validate Session: Invalid session from keep alive',
				status,
			});

			return {
				redirect: forwardSearchParams(req, '/auth/logout', {
					reason: APIResponseCodes.SessionExpired.toString(),
				}),
			};
		} else if (status === 'needs_refresh') {
			Log.info({
				action: 'validateSession',
				message: { pathname: req.nextUrl.pathname },
			});
			Log.info({
				action: 'validateSession',
				message: 'ThonLabs Validate Session: Needs refresh from keep alive',
				status,
			});

			const response = await ServerSessionService.validateRefreshToken(res);
			if (response.statusCode === 200) {
				return {
					accessToken: res.cookies.get('tl_session')?.value,
					res,
				};
			}

			return {
				redirect: forwardSearchParams(req, '/auth/logout', {
					reason: APIResponseCodes.SessionExpired.toString(),
				}),
			};
		}
	}

	return {
		accessToken: res.cookies.get('tl_session')?.value,
		res,
	};
}

export function getSession() {
	return ServerSessionService.getSession();
}

export function getAccessToken() {
	const { accessToken } = ServerSessionService.getSessionCookies();
	return accessToken;
}

export function redirectToLogin(req: NextRequest, dest: URL) {
	if (dest.toString().endsWith('bypass')) {
		return withThonLabs(req);
	}

	return NextResponse.redirect(dest);
}

function isThonLabsPageRoute(req: NextRequest) {
	return authRoutes.some((route) => req.nextUrl.pathname.startsWith(route));
}

type MiddlewareInitResponse = Parameters<typeof NextResponse.next>[0];

export function withThonLabs(
	req: NextRequest,
	config: ThonLabsMiddlewareConfig = {},
	init: MiddlewareInitResponse = {},
): NextResponse {
	const headers = new Headers(init.headers || {});
	const isThonLabsPage = isThonLabsPageRoute(req);

	headers.set('x-Auth-Powered-By', 'ThonLabs');
	headers.set('x-pathname', req.nextUrl.pathname);

	if (isThonLabsPage) {
		headers.set('x-TL-Route', 'true');
	}

	const response = NextResponse.next({ ...init, headers });

	if (config.res) {
		config.res.cookies.getAll().forEach((cookie) => {
			response.cookies.set(cookie.name, cookie.value, cookie);
		});
	}

	return response;
}

export async function isThonLabsRoute() {
	const headersList = await headers();
	return headersList.get('x-TL-Route') === 'true';
}
