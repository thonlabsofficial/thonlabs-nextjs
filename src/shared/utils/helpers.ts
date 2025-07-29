import type { NextRequest } from 'next/server';
import * as qs from 'qs';
import Log from '../../shared/utils/log';

export function getHost(req: NextRequest) {
	const host = req.headers.get('x-forwarded-host') || req.headers.get('host');

	if (!host) {
		Log.info('helpers.getURLFromHost: Unable to determine host');
		throw new Error('Unable to determine host');
	}

	const protocol = req.headers.get('x-forwarded-proto') || 'https';

	return `${protocol}://${host}`;
}

export function getURLFromHost(req: NextRequest, includePathname = true) {
	const baseUrl = getHost(req);
	const pathname = req.nextUrl.pathname;

	if (includePathname) {
		return new URL(pathname, baseUrl);
	}

	return new URL(baseUrl);
}

export function removePathnameFromURL(url: string) {
	if (!url) {
		return '/';
	}

	const urlObj = new URL(url);
	return new URL(`${urlObj.protocol}//${urlObj.host}`);
}

export function forwardSearchParams(
	req: NextRequest,
	path: string,
	additionalSearchParams: Record<string, string> = {},
) {
	const url = getURLFromHost(req, false);
	const redirectUrl = new URL(path, url.toString());
	const strAdditionalSearchParams = qs.stringify(additionalSearchParams);

	redirectUrl.search = req.nextUrl.search.startsWith('?')
		? `${req.nextUrl.search}&${strAdditionalSearchParams}`
		: `?${strAdditionalSearchParams}${req.nextUrl.search}`;

	return redirectUrl;
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isLocalhost(domain: string) {
	return domain.includes('localhost') || domain.includes('127.0.0.1');
}
