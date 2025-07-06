'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { authRoutes } from '../utils/constants';

export default function SearchParamsObservable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  React.useEffect(() => {
    if (!isAuthRoute) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (params.get('r')) {
      params.delete('r');
      window.location.href = `/auth/login?${params.toString()}`;
    }
  }, [isAuthRoute, searchParams]);

  return null;
}
