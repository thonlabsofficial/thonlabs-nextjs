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
			if (typeof window !== 'undefined') {
				await fetch('/api/auth/logout', { method: 'POST' });
				window.location.href = `/auth/login?reason=${APIResponseCodes.SessionExpired}`;
			}
			break;
	}

	Log.error({
		action: 'handleResponseError (interceptor)',
		message: 'Error URL',
		data: { url: error.url, status: error.status },
	});

	return error;
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
		fromServer = false,
		...options
	}: RequestInit & {
		useEnvBaseURL?: boolean;
		environmentId?: string;
		publicKey?: string;
		authDomain?: string;
		fromServer?: boolean;
	} = {},
) {
	const config = environmentStore.getConfig();
	const headersPayload = {
		environmentId:
			environmentId ||
			config!.environmentId ||
			process.env.TL_ENV_ID ||
			process.env.NEXT_PUBLIC_TL_ENV_ID,
		publicKey:
			publicKey ||
			config!.publicKey ||
			process.env.TL_PK ||
			process.env.NEXT_PUBLIC_TL_PK,
	};

	const params = {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
			...(headersPayload.environmentId
				? { 'tl-env-id': headersPayload.environmentId }
				: {}),
			...(headersPayload.publicKey
				? { 'tl-public-key': headersPayload.publicKey }
				: {}),
		},
	};

	const requestURL = `${getBaseURL(useEnvBaseURL, authDomain)}${url}`;

	Log.debug({
		action: 'labsPublicAPI',
		message: 'Request summary',
		data: {
			url: requestURL,
			params,
		},
	});

	const response = await fetch(requestURL, params);

	Log.debug({
		action: 'labsPublicAPI',
		message: 'Response summary',
		data: {
			url: requestURL,
			data: {
				status: response.status,
			},
		},
	});

	if (
		!fromServer &&
		!response.ok &&
		!publicRoutes.some((route) => url.startsWith(route))
	) {
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
