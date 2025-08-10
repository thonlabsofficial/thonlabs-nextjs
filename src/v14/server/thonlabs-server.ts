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
) {
	if (shouldBypassRoute(req, ['^/api/auth(?!/alive)', ...bypassRoutes])) {
		return new URL('/bypass', req.url);
	}

	const isPublicRoute = isAuthRoute(req);

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
			return forwardSearchParams(req, '/auth/logout', {
				reason: APIResponseCodes.SessionExpired.toString(),
			});
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

			return forwardSearchParams(req, '/auth/logout', {
				reason: APIResponseCodes.SessionExpired.toString(),
			});
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

			const url = getURLFromHost(req);

			return new URL(`/auth/refresh?dest=${url.pathname}`, url.toString());
		}
	}

	return null;
}

export function getSession() {
	return ServerSessionService.getSession();
}

export function getAccessToken() {
	const { accessToken } = ServerSessionService.getSessionCookies();
	return accessToken;
}

export function redirectToLogin(dest: URL) {
	if (dest.toString().endsWith('bypass')) {
		return NextResponse.next();
	}

	return NextResponse.redirect(dest);
}

function isThonLabsPageRoute(req: NextRequest) {
	return authRoutes.some((route) => req.nextUrl.pathname.startsWith(route));
}

type MiddlewareInitResponse = Parameters<typeof NextResponse.next>[0];

export function thonLabsConfig(
	req: NextRequest,
	init: MiddlewareInitResponse = {},
): MiddlewareInitResponse {
	const headers = new Headers(init.headers || {});
	const isThonLabsPage = isThonLabsPageRoute(req);

	headers.set('x-Auth-Powered-By', 'ThonLabs');

	if (isThonLabsPage) {
		headers.set('x-TL-Route', 'true');
	}

	return {
		...init,
		headers,
	};
}

export async function isThonLabsRoute() {
	const headersList = await headers();
	return headersList.get('x-TL-Route') === 'true';
}
