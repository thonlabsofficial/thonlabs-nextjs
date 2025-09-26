import React from 'react';
import SearchParamsWrapper from './search-params-wrapper';
import type { EnvironmentData } from '../interfaces/environment-data';
import { api } from '../utils/api';
import Log from '../utils/log';
import { ThonLabsInternalProvider } from '../providers/thonlabs-internal-provider';
import { ThonLabsEnvDataProvider } from './thonlabs-env-data-provider';

export interface ThonLabsAuthRouteWrapperProps
	extends React.HTMLAttributes<HTMLElement> {
	environmentId: string;
	publicKey: string;
	redirectOnAuthenticated?: string;
}

export async function ThonLabsAuthRouteWrapper({
	environmentId,
	publicKey,
	redirectOnAuthenticated,
	children,
}: ThonLabsAuthRouteWrapperProps) {
	const environmentData = await api<EnvironmentData>(
		`/environments/${environmentId}/data`,
		{
			environmentId,
			publicKey,
		},
	);

	if (!environmentData) {
		Log.error({
			action: 'ThonLabsWrapper',
			message:
				'ThonLabs Error: Environment data is unavailable. Please verify that the public key and environment settings are correct. You can find these values under settings page at https://app.thonlabs.io.',
		});
		return null;
	}

	const ssoProviders = await api<EnvironmentData['ssoProviders']>(
		`/environments/${environmentId}/data/credentials/sso/public`,
		{
			environmentId,
			publicKey,
		},
	);

	return (
		<ThonLabsInternalProvider>
			<SearchParamsWrapper />
			<React.Suspense>
				<ThonLabsEnvDataProvider
					environmentData={
						{
							...environmentData,
							ssoProviders,
						} as EnvironmentData
					}
					environmentId={environmentId}
					publicKey={publicKey}
					redirectOnAuthenticated={redirectOnAuthenticated}
				>
					{children}
				</ThonLabsEnvDataProvider>
			</React.Suspense>
		</ThonLabsInternalProvider>
	);
}
