'use client';

import React from 'react';
import type { User } from '../../shared/interfaces/user';
import ClientSessionService from '../../v15/services/client-session-service';
import useSWR from 'swr';

export interface ThonLabsSessionContextProps {
	user: User | null;
	isLoadingSession: boolean;
	invalidateSession: () => Promise<User | null>;
}

export const ThonLabsSessionContext =
	React.createContext<ThonLabsSessionContextProps>({
		user: {} as User,
		isLoadingSession: false,
		invalidateSession: () => Promise.resolve(null),
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
	const {
		data: clientUser,
		isLoading: isLoadingSession,
		mutate,
	} = useSWR('/auth/session', () =>
		ClientSessionService.getSession({ authDomain, environmentId }),
	);
	const memoUser = React.useMemo(
		() => clientUser || user || null,
		[clientUser, user],
	);

	async function invalidateSession() {
		const user = await ClientSessionService.getSession({
			authDomain,
			environmentId,
		});
		mutate(user);
		return user;
	}

	return (
		<ThonLabsSessionContext.Provider
			value={{
				user: memoUser,
				isLoadingSession,
				invalidateSession,
			}}
		>
			{children}
		</ThonLabsSessionContext.Provider>
	);
}
