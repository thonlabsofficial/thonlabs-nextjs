'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { publicRoutes } from '../utils/constants';

export default function SessionValidation() {
	const pathname = usePathname();
	const isPublicRoute = publicRoutes.some((route) =>
		pathname.startsWith(route),
	);
	const [isRouteChanging, setIsRouteChanging] = React.useState(false);

	React.useEffect(() => {
		setIsRouteChanging(true);

		// Reset after route change is complete
		const timer = setTimeout(() => {
			setIsRouteChanging(false);
		}, 150);

		return () => clearTimeout(timer);
	}, [pathname]);

	/*
    This is a check to keep the session alive by
    triggering the validateSession inside middleware
    but only if the route is not public
  */
	React.useEffect(() => {
		let timeout: NodeJS.Timeout;

		const callKeepAlive = async () => {
			if (!isPublicRoute && !isRouteChanging) {
				try {
					await fetch('/api/auth/alive');
				} catch (error) {
					console.error('Failed to keep session alive:', error);
				}
			}
		};

		const handleFocus = () => {
			timeout = setTimeout(() => {
				callKeepAlive();
			}, 100);
		};

		window.addEventListener('focus', handleFocus);

		return () => {
			clearTimeout(timeout);
			window.removeEventListener('focus', handleFocus);
		};
	}, [isPublicRoute, isRouteChanging]);

	return null;
}
