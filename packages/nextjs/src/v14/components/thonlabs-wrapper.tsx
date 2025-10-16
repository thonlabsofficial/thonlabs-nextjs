import type React from 'react';
import type { EnvironmentData } from '../../shared/interfaces/environment-data';
import { environmentStore } from '../../shared/store/env-store';
import Log from '../../shared/utils/log';
import { ThonLabsSessionProvider } from '../../shared/providers/thonlabs-session-provider';
import { authRoutes } from '../../shared/utils/constants';
import { ThonLabsAuthRouteWrapper } from '../../shared/components/thonlabs-auth-route-wrapper';
import { RefreshDetector } from '../../shared/components/refresh-detector';
import { ThonLabsInternalProvider } from '../../shared/providers/thonlabs-internal-provider';
import ServerSessionService from '../services/server-session-service';
import type { User } from '../../shared/interfaces/user';

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
	const user = isAuthRoute
		? null
		: (await ServerSessionService.getSession()).user;

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
			<ThonLabsSessionProvider
				user={user as User}
				environmentId={environmentId}
				authDomain={authDomain}
			>
				{children}
			</ThonLabsSessionProvider>
		</ThonLabsInternalProvider>
	);
}
