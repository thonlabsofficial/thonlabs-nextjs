'use client';

import React from 'react';
import Cookies from 'js-cookie';
import ClientSessionService from '../services/client-session-service';
import { EnvironmentData } from '../../shared/interfaces/environment-data';
import { User } from '../interfaces/user';
import useSWR from 'swr';
import { fetcher, intFetcher, labsPublicAPI } from '../../shared/utils/api';
import { usePathname } from 'next/navigation';
import { authRoutes, publicRoutes } from '../../shared/utils/constants';
import { usePreviewMode } from '../../shared/hooks/use-preview-mode';
import { cn } from '../../ui/core/utils';
import { fonts } from '../../ui/core/fonts';
import { ThemeProvider } from 'next-themes';

/*
  This is a session provider to spread the data to frontend,
  the component goal is to make possible access data as user logged in
  and the environment data.

  This provider is rendered inside the wrapper and is connected to the hooks, so
  the customers don't need to implement this in their app.
*/

export interface ThonLabsSessionContextProps {
  user: User | null;
  environmentData: EnvironmentData | null;
}

export const ThonLabsSessionContext =
  React.createContext<ThonLabsSessionContextProps>({
    user: {} as User,
    environmentData: {} as EnvironmentData,
  });

export interface ThonLabsSessionProviderProps
  extends React.HTMLAttributes<HTMLElement> {
  environmentData: EnvironmentData;
  environmentId: string;
  publicKey: string;
}

export function ThonLabsSessionProvider({
  environmentData,
  children,
  environmentId,
  publicKey,
}: ThonLabsSessionProviderProps) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  /*
    This is a check to keep the session alive by
    triggering the validateSession inside middleware
    but only if the route is not public
  */
  useSWR<EnvironmentData>(
    () => !isPublicRoute && `/api/auth/alive`,
    intFetcher
  );

  const token = Cookies.get('tl_session');
  // TODO: replaces by a "session" API call
  const user = React.useMemo(() => ClientSessionService.getSession(), [token]);
  const { data: clientEnvironmentData } = useSWR<EnvironmentData>(
    `/environments/${environmentId}/data`,
    fetcher({
      environmentId,
      publicKey,
    })
  );
  const { data: ssoProviders } = useSWR<EnvironmentData['ssoProviders']>(
    `/environments/${environmentId}/credentials/sso/public`,
    fetcher({
      environmentId,
      publicKey,
    })
  );
  const { previewMode, previewEnvironmentData } = usePreviewMode();
  const memoClientEnvironmentData = React.useMemo<EnvironmentData>(() => {
    const finalData = clientEnvironmentData || environmentData;

    if (ssoProviders) {
      finalData.ssoProviders = ssoProviders;
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

  return (
    <ThonLabsSessionContext.Provider
      value={{
        environmentData: memoClientEnvironmentData || environmentData,
        user,
      }}
    >
      {isAuthRoute ? (
        <ThemeProvider
          attribute={'data-tl-theme' as any}
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={cn(
              fonts.className,
              'thonlabs font-sans w-full min-h-screen bg-background text-text'
            )}
          >
            {children}
          </div>
        </ThemeProvider>
      ) : (
        children
      )}
    </ThonLabsSessionContext.Provider>
  );
}
