'use client';

import SSOGoogle from '../components/sso-google';
import { useEnvironmentData } from '../../v15/hooks/use-environment-data';

export default function SSOSocialButtons() {
  const { ssoProviders } = useEnvironmentData();

  if (!ssoProviders || Object.keys(ssoProviders).length === 0) {
    return null;
  }

  return ssoProviders.google && <SSOGoogle {...ssoProviders.google} />;
}
