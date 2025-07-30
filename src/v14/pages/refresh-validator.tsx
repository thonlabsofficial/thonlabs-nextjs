'use client';

import { useEffect } from 'react';

interface Props {
	dest: string;
}

export default function RefreshValidator({ dest }: Props) {
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('origin', window.location.origin);
		searchParams.set('dest', dest);

		window.location.href = `/api/auth/refresh?${searchParams.toString()}`;
	}, []);

	return null;
}
