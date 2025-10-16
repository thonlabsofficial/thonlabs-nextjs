'use client';

import React from 'react';
import type { User } from '../../shared/interfaces/user';
import ClientSessionService from '../../v15/services/client-session-service';
import useSWR from 'swr';

export interface ThonLabsSessionContextProps {
	user: User | null;
	isLoadingSession: boolean;
}

export const ThonLabsSessionContext =
	React.createContext<ThonLabsSessionContextProps>({
		user: {} as User,
		isLoadingSession: false,
	});

export interface ThonLabsSessionProviderProps
	extends React.HTMLAttributes<HTMLElement> {
	authDomain: string;
	environmentId: string;
	user: User | null;
}

export function ThonLabsSessionProvider({
	authDomain,
	environmentId,
	children,
	user,
}: ThonLabsSessionProviderProps) {
	const { data: clientUser, isLoading: isLoadingSession } = useSWR(
		'/auth/session',
		() => ClientSessionService.getSession({ authDomain, environmentId }),
	);
	const memoUser = React.useMemo(
		() => clientUser || user || null,
		[clientUser, user],
	);

	return (
		<ThonLabsSessionContext.Provider
			value={{
				user: memoUser,
				isLoadingSession,
			}}
		>
			{children}
		</ThonLabsSessionContext.Provider>
	);
}
