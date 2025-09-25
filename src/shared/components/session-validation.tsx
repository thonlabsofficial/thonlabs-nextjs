'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { publicRoutes } from '../utils/constants';

export default function SessionValidation() {
	const pathname = usePathname();
	const isPublicRoute = publicRoutes.some((route) =>
		pathname.startsWith(route),
	);
	const isRouteChanging = React.useRef(false);

	/*
    This is a check to keep the session alive by
    triggering the validateSession inside middleware
    but only if the route is not public
  */
	React.useEffect(() => {
		const callKeepAlive = async () => {
			if (!isPublicRoute) {
				try {
					await fetch('/api/auth/alive');
				} catch (error) {
					console.error('Failed to keep session alive:', error);
				}
			}
		};

		const handleFocus = () => {
			if (isRouteChanging.current) {
				return;
			}

			callKeepAlive();
		};

		isRouteChanging.current = false;
		callKeepAlive();

		window.addEventListener('focus', handleFocus);

		return () => {
			window.removeEventListener('focus', handleFocus);
		};
	}, [isPublicRoute]);

	React.useEffect(() => {
		return () => {
			isRouteChanging.current = true;
		};
	}, [pathname]);

	return null;
}
