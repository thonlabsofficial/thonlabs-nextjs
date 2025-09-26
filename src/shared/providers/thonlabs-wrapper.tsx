import type React from 'react';
import type { EnvironmentData } from '../interfaces/environment-data';
import { environmentStore } from '../store/env-store';
import Log from '../utils/log';
import { ThonLabsSessionProvider } from './thonlabs-session-provider';
import { authRoutes } from '../utils/constants';
import { ThonLabsAuthRouteWrapper } from '../components/thonlabs-auth-route-wrapper';
import { RefreshDetector } from '../components/refresh-detector';
import { ThonLabsInternalProvider } from './thonlabs-internal-provider';

export interface ThonLabsWrapperProps
	extends React.HTMLAttributes<HTMLElement> {
	environmentId: string;
	publicKey: string;
	authDomain: string;
	redirectOnAuthenticated?: string;
}

export async function ThonLabsWrapper({
	children,
	environmentId,
	publicKey,
	authDomain,
	redirectOnAuthenticated,
}: ThonLabsWrapperProps) {
	if (!environmentId) {
		Log.error({
			action: 'ThonLabsWrapper',
			message: 'ThonLabs Error: Environment ID is required.',
		});
		return null;
	}

	if (!publicKey) {
		Log.error({
			action: 'ThonLabsWrapper',
			message: 'ThonLabs Error: Public key is required.',
		});
		return null;
	}

	environmentStore.setConfig({
		environmentId,
		publicKey,
		authDomain,
	} as EnvironmentData);

	const headersList = await require('next/headers').headers();
	const isAuthRoute = authRoutes.some((route) =>
		headersList.get('x-pathname')?.startsWith(route),
	);

	return isAuthRoute ? (
		<ThonLabsAuthRouteWrapper
			environmentId={environmentId}
			publicKey={publicKey}
			redirectOnAuthenticated={redirectOnAuthenticated}
		>
			{children}
		</ThonLabsAuthRouteWrapper>
	) : (
		<ThonLabsInternalProvider>
			<RefreshDetector />
			<ThonLabsSessionProvider authDomain={authDomain}>
				{children}
			</ThonLabsSessionProvider>
		</ThonLabsInternalProvider>
	);
}
