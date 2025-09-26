import type React from 'react';
import { headers } from 'next/headers';
import Log from '../../shared/utils/log';
import { ThonLabsSessionProvider } from '../../shared/providers/thonlabs-session-provider';
import { authRoutes } from '../../shared/utils/constants';
import { ThonLabsAuthRouteWrapper } from '../../shared/components/thonlabs-auth-route-wrapper';
import { RefreshDetector } from '../../shared/components/refresh-detector';
import { ThonLabsInternalProvider } from '../../shared/providers/thonlabs-internal-provider';

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

	const headersList = await headers();
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
			<ThonLabsSessionProvider>
				<RefreshDetector />
				{children}
			</ThonLabsSessionProvider>
		</ThonLabsInternalProvider>
	);
}
