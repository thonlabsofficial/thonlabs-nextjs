'use client';

import Cookies from 'js-cookie';
import React from 'react';
import type { User } from '../interfaces/user';
import ClientSessionService from '../services/client-session-service';

export interface ThonLabsSessionContextProps {
	user: User | null;
}

export const ThonLabsSessionContext =
	React.createContext<ThonLabsSessionContextProps>({
		user: {} as User,
	});

export interface ThonLabsSessionProviderProps
	extends React.HTMLAttributes<HTMLElement> {}

export function ThonLabsSessionProvider({
	children,
}: ThonLabsSessionProviderProps) {
	const token = Cookies.get('tl_session');
	// TODO: replaces by a "session" API call
	const user = React.useMemo(() => ClientSessionService.getSession(), [token]);

	return (
		<ThonLabsSessionContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</ThonLabsSessionContext.Provider>
	);
}
