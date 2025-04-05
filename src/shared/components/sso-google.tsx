import React from 'react';
import { SSOSocial } from '../interfaces/sso-social';
import { Button } from '../../ui/components/button';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  clientId: SSOSocial['clientId'];
  redirectUri: SSOSocial['redirectUri'];
}

export default function SSOGoogle({ clientId, redirectUri }: Props) {
  const handleLogin = () => {
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

    // Add required OAuth 2.0 parameters
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', 'email profile');
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('prompt', 'consent');

    // Redirect the browser to Google's authorization page
    window.location.href = authUrl.toString();
  };

  return (
    <Button type="button" onClick={handleLogin}>
      Continue with Google
    </Button>
  );
}
