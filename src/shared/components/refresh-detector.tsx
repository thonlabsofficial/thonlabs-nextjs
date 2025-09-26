'use client';

import { useEffect } from 'react';
import ClientSessionService from '../../v15/services/client-session-service';

export function RefreshDetector() {
	useEffect(() => {
		const handleBeforeUnload = () => {
			console.log('Saindooooo!');
			ClientSessionService.setIsRefreshing(true);
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return null;
}
