'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import useSWR from 'swr';
import Logout from './logout';
import ShadowRoot from './shadow-root';
import ThonLabsRoutesWrapper from './thonlabs-routes-wrapper';
import { usePreviewMode } from '../hooks/use-preview-mode';
import type { EnvironmentData } from '../interfaces/environment-data';
import { globalCSS } from '../styles/globals';
import { sonnerCSS } from '../styles/sonner';
import { fetcher, labsPublicAPI } from '../utils/api';

export interface ThonLabsEnvDataContextProps {
	environmentData: EnvironmentData | null;
}

export const ThonLabsEnvDataContext =
	React.createContext<ThonLabsEnvDataContextProps>({
		environmentData: {} as EnvironmentData,
	});

export interface ThonLabsEnvDataProviderProps
	extends React.HTMLAttributes<HTMLElement> {
	environmentData: EnvironmentData;
	environmentId: string;
	publicKey: string;
	redirectOnAuthenticated?: string;
	withShadowRoot?: boolean;
}

export function ThonLabsEnvDataProvider({
	environmentData,
	children,
	environmentId,
	publicKey,
	redirectOnAuthenticated,
	withShadowRoot = true,
}: ThonLabsEnvDataProviderProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { data: clientEnvironmentData } = useSWR<EnvironmentData>(
		`/environments/${environmentId}/data`,
		fetcher({
			environmentId,
			publicKey,
		}),
	);
	const { data: ssoProviders } = useSWR<EnvironmentData['ssoProviders']>(
		`/environments/${environmentId}/credentials/sso/public`,
		fetcher({
			environmentId,
			publicKey,
		}),
	);
	const { previewMode, previewEnvironmentData } = usePreviewMode();
	const memoClientEnvironmentData = React.useMemo<EnvironmentData>(() => {
		const finalData = clientEnvironmentData || environmentData;

		if (ssoProviders) {
			finalData.ssoProviders = ssoProviders;
		}

		if (redirectOnAuthenticated) {
			finalData.redirectOnAuthenticated = redirectOnAuthenticated;
		}

		if (previewMode) {
			console.log('Collecting data from preview mode');

			return {
				...finalData,
				...previewEnvironmentData,
			};
		}

		return finalData;
	}, [
		environmentId,
		publicKey,
		clientEnvironmentData,
		previewEnvironmentData,
		ssoProviders,
		redirectOnAuthenticated,
	]);

	React.useEffect(() => {
		if (!memoClientEnvironmentData?.sdkIntegrated) {
			labsPublicAPI(`/environments/${environmentId}/data/integrated`, {
				method: 'POST',
				useEnvBaseURL: true,
				environmentId,
				publicKey,
			});
		}
	}, [memoClientEnvironmentData]);

	/* 
    Don't render anything in case of logout
    it prevents the content of app conflicts with the ThonLabs context.
  */
	if (pathname.startsWith('/auth/logout')) {
		return <Logout />;
	}

	if (searchParams.get('r')) {
		return null;
	}

	return (
		<ThonLabsEnvDataContext.Provider
			value={{
				environmentData: memoClientEnvironmentData || environmentData,
			}}
		>
			<ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
				{withShadowRoot ? (
					<ShadowRoot appendCSS={[globalCSS, sonnerCSS]}>
						<ThonLabsRoutesWrapper>{children}</ThonLabsRoutesWrapper>
					</ShadowRoot>
				) : (
					<ThonLabsRoutesWrapper>{children}</ThonLabsRoutesWrapper>
				)}
			</ThemeProvider>
		</ThonLabsEnvDataContext.Provider>
	);
}
