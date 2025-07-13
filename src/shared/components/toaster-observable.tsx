'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useToast } from '../../ui/hooks/use-toast';
import { apiResponseMessages } from '../utils/errors';
import { delay } from '../utils/helpers';

export default function ToasterObservable() {
	const searchParams = useSearchParams();
	const { toast } = useToast();

	React.useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());
		const info = params.get(
			'info',
		) as unknown as keyof typeof apiResponseMessages;
		const reason = params.get(
			'reason',
		) as unknown as keyof typeof apiResponseMessages;
		const message = apiResponseMessages[reason] || apiResponseMessages[info];

		if (message) {
			delay(1).then(() => {
				toast({
					description: message,
					duration: 2800,
					variant: reason ? 'destructive' : 'default',
				});
				params.delete('reason');
				params.delete('info');
				window.history.pushState(null, '', `?${params.toString()}`);
			});
		}
	}, []);

	return null;
}
