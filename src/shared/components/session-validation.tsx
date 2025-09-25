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
		const callKeepAlive = async () => {
			if (!isPublicRoute && !isRouteChanging) {
				try {
					await fetch('/api/auth/alive');
				} catch (error) {
					console.error('Failed to keep session alive:', error);
				}
			}
		};

		let linkClicked = false;

		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.closest('a[href]')) {
				linkClicked = true;
				setTimeout(() => {
					linkClicked = false;
				}, 100);
			}
		};

		const handleFocus = () => {
			setTimeout(() => {
				if (!linkClicked) {
					callKeepAlive();
				}
			}, 10);
		};

		document.addEventListener('click', handleClick, true);
		window.addEventListener('focus', handleFocus);

		return () => {
			document.removeEventListener('click', handleClick, true);
			window.removeEventListener('focus', handleFocus);
		};
	}, [isPublicRoute, isRouteChanging]);

	return null;
}
