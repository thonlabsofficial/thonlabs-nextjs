'use client';

import SSOGoogle from '../components/sso-google';
import { useEnvironmentData } from '../../v15/hooks/use-environment-data';
import { SSOSocialProvider } from '../interfaces/sso-social';

export default function SSOSocialButtons() {
  const { ssoProviders, activeSSOProviders } = useEnvironmentData();

  if (
    !ssoProviders ||
    Object.keys(ssoProviders).length === 0 ||
    activeSSOProviders.length === 0
  ) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-col gap-2">
        {activeSSOProviders.includes(SSOSocialProvider.GOOGLE) && (
          <SSOGoogle {...ssoProviders.google} />
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border mt-1" />
        <span className="text-sm text-muted-foreground">or</span>
        <div className="flex-1 h-px bg-border mt-1" />
      </div>
    </div>
  );
}
