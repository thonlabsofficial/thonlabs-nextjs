'use client';

import Cookies from 'js-cookie';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';
import Logout from '../../shared/components/logout';
import ShadowRoot from '../../shared/components/shadow-root';
import ThonLabsRoutesWrapper from '../../shared/components/thonlabs-routes-wrapper';
import type { EnvironmentData } from '../../shared/interfaces/environment-data';
import { globalCSS } from '../../shared/styles/globals';
import { sonnerCSS } from '../../shared/styles/sonner';
import { fetcher, intFetcher, labsPublicAPI } from '../../shared/utils/api';
import { authRoutes, publicRoutes } from '../../shared/utils/constants';
import type { User } from '../interfaces/user';
import ClientSessionService from '../services/client-session-service';

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
    environmentData: {} as EnvironmentData
  });

export interface ThonLabsSessionProviderProps
  extends React.HTMLAttributes<HTMLElement> {
  environmentData: EnvironmentData;
  environmentId: string;
  publicKey: string;
  redirectOnAuthenticated?: string;
}

export function ThonLabsSessionProvider({
  environmentData,
  children,
  environmentId,
  publicKey,
  redirectOnAuthenticated
}: ThonLabsSessionProviderProps) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const searchParams = useSearchParams();
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
      publicKey
    })
  );
  const { data: ssoProviders } = useSWR<EnvironmentData['ssoProviders']>(
    `/environments/${environmentId}/credentials/sso/public`,
    fetcher({
      environmentId,
      publicKey
    })
  );
  const memoClientEnvironmentData = React.useMemo<EnvironmentData>(() => {
    const finalData = clientEnvironmentData || environmentData;

    if (ssoProviders) {
      finalData.ssoProviders = ssoProviders;
    }

    if (redirectOnAuthenticated) {
      finalData.redirectOnAuthenticated = redirectOnAuthenticated;
    }

    return finalData;
  }, [
    environmentId,
    publicKey,
    clientEnvironmentData,
    ssoProviders,
    redirectOnAuthenticated
  ]);

  React.useEffect(() => {
    if (!memoClientEnvironmentData?.sdkIntegrated) {
      labsPublicAPI(`/environments/${environmentId}/data/integrated`, {
        method: 'POST',
        useEnvBaseURL: true,
        environmentId,
        publicKey
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
    <ThonLabsSessionContext.Provider
      value={{
        environmentData: memoClientEnvironmentData || environmentData,
        user
      }}
    >
      {isAuthRoute ? (
        <ShadowRoot appendCSS={[globalCSS, sonnerCSS]}>
          <ThonLabsRoutesWrapper>{children}</ThonLabsRoutesWrapper>
        </ShadowRoot>
      ) : (
        children
      )}
    </ThonLabsSessionContext.Provider>
  );
}
