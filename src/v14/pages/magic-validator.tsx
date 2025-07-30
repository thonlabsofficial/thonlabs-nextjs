'use client';

import { useEffect } from 'react';
import { APIResponseCodes } from '../../shared/utils/errors';

interface Props {
	token: string;
	inviteFlow?: boolean;
}

export default function MagicValidator({ token, inviteFlow }: Props) {
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('origin', window.location.origin);

		if (inviteFlow) {
			searchParams.set('info', APIResponseCodes.InviteAccepted.toString());
		}

		window.location.href = `/api/auth/magic/${token}?${searchParams.toString()}`;
	}, []);

	return null;
}
