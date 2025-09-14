'use client';

import { useEffect } from 'react';
import type { SSOSocialProvider } from '../interfaces/sso-social';

interface Props {
  provider: SSOSocialProvider;
  code: string;
}

export default function SSORedirect({ provider, code }: Props) {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('origin', window.location.origin);

    window.location.href = `/api/auth/sso/${Buffer.from(`${provider}::${code}`).toString('base64')}?${searchParams.toString()}`;
  }, []);

  return null;
}
