'use client';

import { useEffect } from 'react';

export default function Logout() {
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('origin', window.location.origin);

		window.location.href = `/api/auth/logout?${searchParams.toString()}`;
	}, []);

	return null;
}
