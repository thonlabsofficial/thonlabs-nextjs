'use client';

import type React from 'react';
import { Typo } from '../../../ui/components/typo';
import { cn } from '../../../ui/core/utils';
import { useEnvironmentData } from '../../hooks/use-environment-data';

type Props = {
	title: React.ReactNode;
	description?: 'login' | 'signUp' | string;
};

export default function AuthHeader({
	title,
	description,
	className,
	...props
}: Props & React.HTMLAttributes<HTMLElement>) {
	const { appName } = useEnvironmentData();

	const descriptionMapper = {
		login: `Log in to ${appName}`,
		signUp: `Create an account to ${appName}`,
	};

	return (
		<header
			{...props}
			className={cn('tl-flex tl-flex-col tl-gap-1', className)}
		>
			<Typo variant={'h2'}>{title}</Typo>
			{description && (
				<Typo variant={'muted'} className="!tl-text-gray-400">
					{descriptionMapper[description as keyof typeof descriptionMapper]
						? descriptionMapper[description as keyof typeof descriptionMapper]
						: description}
				</Typo>
			)}
		</header>
	);
}
