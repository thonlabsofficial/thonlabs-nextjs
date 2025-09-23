import type React from 'react';
import { headers } from 'next/headers';
import type { EnvironmentData } from '../../shared/interfaces/environment-data';
import { environmentStore } from '../../shared/store/env-store';
import Log from '../../shared/utils/log';
import { ThonLabsSessionProvider } from './thonlabs-session-provider';
import { authRoutes } from '../../shared/utils/constants';
import SessionValidation from '../../shared/components/session-validation';
import { ThonLabsAuthRouteWrapper } from '../../shared/components/thonlabs-auth-route-wrapper';

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

	try {
		environmentStore.setConfig({
			environmentId,
			publicKey,
			authDomain,
		} as EnvironmentData);
	} catch (error) {
		Log.error({
			action: 'ThonLabsWrapper',
			message: 'ThonLabs Error: Failed to set environment data.',
			error,
		});
		return null;
	}

	const headersList = await headers();
	const isAuthRoute = authRoutes.some((route) =>
		headersList.get('x-pathname')?.startsWith(route),
	);

	console.log('isAuthRoute', isAuthRoute);

	return isAuthRoute ? (
		<ThonLabsAuthRouteWrapper
			environmentId={environmentId}
			publicKey={publicKey}
			redirectOnAuthenticated={redirectOnAuthenticated}
		>
			{children}
		</ThonLabsAuthRouteWrapper>
	) : (
		<>
			<SessionValidation />
			<ThonLabsSessionProvider>{children}</ThonLabsSessionProvider>
		</>
	);
}
