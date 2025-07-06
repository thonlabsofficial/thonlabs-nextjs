import { NextRequest, NextResponse } from 'next/server';
import ServerSessionService from '../services/server-session-service';
import {
  forwardSearchParams,
  getURLFromHost,
  removePathnameFromURL,
} from '../../shared/utils/helpers';
import Log from '../../shared/utils/log';
import { authRoutes, publicRoutes } from '../../shared/utils/constants';

export function isAuthRoute(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return isPublicRoute;
}

export function isThonLabsPageRoute(req: NextRequest) {
  console.log(authRoutes, req.nextUrl.pathname);
  return authRoutes.some((route) => req.nextUrl.pathname.startsWith(route));
}

export function shouldBypassRoute(req: NextRequest, routes: string[]) {
  const pathname = req.nextUrl.pathname;
  const shouldBypass = routes.some((route) => pathname.startsWith(route));

  return shouldBypass;
}

export async function validateSession(
  req: NextRequest,
  bypassRoutes: string[] = []
) {
  if (
    shouldBypassRoute(req, [
      '/api/auth/refresh',
      '/api/auth/logout',
      '/api/auth/magic',
      '/api/auth/confirm-email',
      '/api/auth/sso',
      ...bypassRoutes,
    ])
  ) {
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
      return forwardSearchParams(req, '/api/auth/logout');
    }

    const { status } = await ServerSessionService.shouldKeepAlive();

    if (status === 'invalid_session') {
      Log.info({
        action: 'validateSession',
        message: 'ThonLabs Validate Session: Invalid session from keep alive',
        status,
      });

      return forwardSearchParams(req, '/api/auth/logout');
    } else if (status === 'needs_refresh') {
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

export function getTokens() {
  return ServerSessionService.getSessionCookies();
}

export async function redirectToLogin(dest: URL): Promise<NextResponse> {
  if (dest.toString().endsWith('bypass')) {
    return NextResponse.next();
  }

  return NextResponse.redirect(dest);
}
