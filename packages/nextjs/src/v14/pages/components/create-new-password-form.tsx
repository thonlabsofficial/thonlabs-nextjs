'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../ui/components/button';
import { Input, InputWrapper } from '../../../ui/components/input';
import { useToast } from '../../../ui/hooks/use-toast';
import { useEnvironmentData } from '../../../shared/hooks/use-environment-data';
import { createNewPassword, login } from '../actions/auth-actions';
import {
	type CreateNewPasswordFormData,
	CreateNewPasswordFormSchema,
} from '../validators/auth-validators';

type Props = {
	token: string;
	email?: string;
};

export default function CreateNewPasswordForm({ token, email }: Props) {
	const [loading, setLoading] = React.useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const { styles, redirectOnAuthenticated } = useEnvironmentData();

	const form = useForm<CreateNewPasswordFormData>({
		resolver: zodResolver(CreateNewPasswordFormSchema),
	});

	async function onSubmit(data: CreateNewPasswordFormData) {
		try {
			setLoading(true);

			await createNewPassword(token, data);

			let goTo = '/auth/login';

			/*
        If there is an email here it means the user is coming
        from a "invitation" flow, the goal is to define password
        and continue to the app.
      */
			if (email) {
				await login({
					email,
					password: data.password,
				});
				goTo = redirectOnAuthenticated || '/';
			}

			toast({
				title: email ? 'Welcome' : 'Password created',
				description: `Your new password has been securely stored. You can now access your account using it.`,
			});

			router.push(goTo);
		} catch {
			toast({
				title: 'Error',
				description:
					'An error occurred while creating a new password. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<div className="tl-grid tl-w-full tl-items-center tl-gap-5">
				<InputWrapper>
					<Input
						placeholder="••••••••••••"
						size="lg"
						type="password"
						label="New Password"
						error={form.formState.errors.password?.message}
						{...form.register('password')}
					/>
				</InputWrapper>
				<InputWrapper>
					<Input
						placeholder="••••••••••••"
						size="lg"
						type="password"
						label="Confirm New Password"
						error={form.formState.errors.confirm?.message}
						{...form.register('confirm')}
					/>
				</InputWrapper>
			</div>

			<Button
				className="tl-w-full tl-mt-8"
				loading={loading}
				style={{ backgroundColor: styles.primaryColor }}
			>
				{loading && (
					<ReloadIcon className="tl-mr-2 tl-h-4 tl-w-4 tl-animate-spin tl--mt-1" />
				)}
				Set New Password
			</Button>
		</form>
	);
}
