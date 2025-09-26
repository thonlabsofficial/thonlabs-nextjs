import { environmentStore } from '../store/env-store';
import { publicRoutes } from './constants';
import { APIResponseCodes } from './errors';
import { isLocalhost } from './helpers';
import Log from './log';

export const api = <T>(
	url: string,
	{
		environmentId,
		publicKey,
	}: {
		environmentId: string;
		publicKey: string;
	},
) => {
	return fetch(`${getBaseURL()}${url}`, {
		headers: {
			'tl-env-id': environmentId,
			'tl-public-key': publicKey,
		},
	})
		.then((res) => res.json() as Promise<T>)
		.catch(() => {});
};

export const fetcher =
	({
		environmentId,
		publicKey,
	}: {
		environmentId: string;
		publicKey: string;
	}) =>
	(url: string) => {
		return fetch(`${getBaseURL()}${url}`, {
			headers: {
				'tl-env-id': environmentId,
				'tl-public-key': publicKey,
			},
		}).then((res) => res.json());
	};

export const intFetcher = (url: string) => fetch(url).then((res) => res.json());

async function handleResponseError(error: Response) {
	const statusCode = error.status;

	switch (statusCode) {
		case 401:
			await fetch('/api/auth/logout', { method: 'POST' });
			localStorage.removeItem('tl_refreshing');
			window.location.href = `/auth/login?reason=${APIResponseCodes.SessionExpired}`;
			break;
	}

	return Promise.reject(error);
}

export async function intAPI(url: string, options: RequestInit = {}) {
	const response = await fetch(url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
	});

	if (!response.ok) {
		await handleResponseError(response);
	}

	return response;
}

export async function labsPublicAPI(
	url: string,
	{
		useEnvBaseURL,
		environmentId,
		publicKey,
		authDomain,
		...options
	}: RequestInit & {
		useEnvBaseURL?: boolean;
		environmentId?: string;
		publicKey?: string;
		authDomain?: string;
	} = {},
) {
	const config = environmentStore.getConfig();

	const params = {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
			'tl-env-id': environmentId || config!.environmentId,
			'tl-public-key': publicKey || config!.publicKey,
		},
	};

	const response = await fetch(
		`${getBaseURL(useEnvBaseURL, authDomain)}${url}`,
		params,
	);

	if (!response.ok && !publicRoutes.some((route) => url.startsWith(route))) {
		return await handleResponseError(response);
	}

	return response;
}

function getBaseURL(useEnvBaseURL: boolean = false, authDomain?: string) {
	const config = environmentStore.getConfig();

	let finalAuthDomain: string = authDomain || config?.authDomain || '';
	if (!finalAuthDomain || useEnvBaseURL) {
		finalAuthDomain = (process.env.TL_AUTH_DOMAIN ||
			process.env.NEXT_PUBLIC_TL_AUTH_DOMAIN) as string;
	}

	if (!finalAuthDomain) {
		const message =
			'ThonLabs Error: Environment variable TL_AUTH_DOMAIN is not set or not being forwarded to <ThonLabsWrapper /> component. You can find these values under settings page at https://app.thonlabs.io.';
		Log.error({ action: 'getBaseURL', message });
		throw new Error(message);
	}

	return `${isLocalhost(finalAuthDomain) ? 'http' : 'https'}://${finalAuthDomain}`;
}
