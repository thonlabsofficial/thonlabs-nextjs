'use client';

import { useEffect } from 'react';

interface Props {
  token: string;
}

export default function ConfirmEmailValidator({ token }: Props) {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('origin', window.location.origin);

    window.location.href = `/api/auth/confirm-email/${token}?${searchParams.toString()}`;
  }, []);

  return null;
}
