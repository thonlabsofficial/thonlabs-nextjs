import React from 'react';
import { ThonLabsSessionContext } from '../providers/thonlabs-session-provider';
import ClientSessionService from '../../v15/services/client-session-service';

export function useSession() {
	const sessionContext = React.useContext(ThonLabsSessionContext);
	const [isLoggingOut, setIsLoggingOut] = React.useState(false);

	async function logout() {
		try {
			setIsLoggingOut(true);
			await ClientSessionService.logout();
		} catch (e) {
			console.error('useSession.logout - error on logout:', e);
		} finally {
			setIsLoggingOut(false);
		}
	}

	return {
		...sessionContext,
		logout,
		isLoggingOut,
	};
}
