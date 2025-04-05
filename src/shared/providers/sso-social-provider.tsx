'use client';

import SSOGoogle from '../components/sso-google';
import { useEnvironmentData } from '../../v15/hooks/use-environment-data';

export default function SSOSocialButtons() {
  const { ssoSocialProviders } = useEnvironmentData();

  if (!ssoSocialProviders || Object.keys(ssoSocialProviders).length === 0) {
    return null;
  }

  return (
    ssoSocialProviders.google && <SSOGoogle {...ssoSocialProviders.google} />
  );
}
