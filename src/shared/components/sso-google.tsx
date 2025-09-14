'use client';

import type React from 'react';
import { Button } from '../../ui/components/button';
import GoogleIcon from '../../ui/icons/google-icon';
import { usePreviewMode } from '../hooks/use-preview-mode';
import type { SSOSocial } from '../interfaces/sso-social';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  clientId: SSOSocial['clientId'];
  redirectURI: SSOSocial['redirectURI'];
}

export default function SSOGoogle({ clientId, redirectURI }: Props) {
  const { previewMode } = usePreviewMode();

  const handleLogin = () => {
    if (previewMode) {
      return;
    }

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

    // Add required OAuth 2.0 parameters
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectURI);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', 'email profile');
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('prompt', 'consent');

    // Redirect the browser to Google's authorization page
    window.location.href = authUrl.toString();
  };

  return (
    <Button
      type="button"
      variant={'outline'}
      icon={GoogleIcon}
      onClick={handleLogin}
    >
      Continue with Google
    </Button>
  );
}
