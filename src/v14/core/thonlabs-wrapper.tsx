import SearchParamsObservable from '../../shared/components/search-params-observable';
import type { EnvironmentData } from '../../shared/interfaces/environment-data';
import { environmentStore } from '../../shared/store/env-store';
import { api } from '../../shared/utils/api';
import Log from '../../shared/utils/log';
import { ThonLabsInternalProvider } from './thonlabs-internal-provider';
import { ThonLabsSessionProvider } from './thonlabs-session-provider';

/*
  This is a wrapper to get environment data from backend and forward to frontend.
  The customers needs to implement this in their app to make things work.

  Order is:
    - Wrapper
      - Session Provider
        - General Provider
*/

export interface ThonLabsWrapperProps
	extends React.HTMLAttributes<HTMLElement> {
	environmentId: string;
	publicKey: string;
	authDomain: string;
}

export async function ThonLabsWrapper({
	children,
	environmentId,
	publicKey,
	authDomain,
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
				'ThonLabs Error: Environment data is unavailable. Please verify that the public key and environment settings are correct. You can find these values under "Integration Keys" at https://app.thonlabs.io.',
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
			<SearchParamsObservable />
			<ThonLabsSessionProvider
				environmentData={
					{
						...environmentData,
						ssoProviders,
					} as EnvironmentData
				}
				environmentId={environmentId}
				publicKey={publicKey}
			>
				{children}
			</ThonLabsSessionProvider>
		</ThonLabsInternalProvider>
	);
}
