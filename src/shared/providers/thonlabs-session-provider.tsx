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
}

export function ThonLabsSessionProvider({
	authDomain,
	environmentId,
	children,
}: ThonLabsSessionProviderProps) {
	const { data, isLoading: isLoadingSession } = useSWR('/auth/session', () =>
		ClientSessionService.getSession({ authDomain, environmentId }),
	);
	const user = React.useMemo(() => data || null, [data]);

	return (
		<ThonLabsSessionContext.Provider
			value={{
				user,
				isLoadingSession,
			}}
		>
			{children}
		</ThonLabsSessionContext.Provider>
	);
}
