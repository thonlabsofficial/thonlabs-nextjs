'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import SSOSocialButtons from '../../../shared/components/sso-social-buttons';
import { usePreviewMode } from '../../../shared/hooks/use-preview-mode';
import { AuthProviders } from '../../../shared/interfaces/environment-data';
import { delay } from '../../../shared/utils/helpers';
import { Button } from '../../../ui/components/button';
import { Input, InputWrapper } from '../../../ui/components/input';
import { Label } from '../../../ui/components/label';
import { Typo } from '../../../ui/components/typo';
import { useToast } from '../../../ui/hooks/use-toast';
import { useEnvironmentData } from '../../hooks/use-environment-data';
import { signUp } from '../actions/auth-actions';
import {
	type SignUpFormData,
	SignUpFormSchema,
} from '../validators/auth-validators';

export default function SignUpForm() {
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();
	const { toast } = useToast();
	const { authProvider, enableSignUp, styles } = useEnvironmentData();
	const { previewMode } = usePreviewMode();

	const form = useForm<SignUpFormData>({
		resolver: zodResolver(
			SignUpFormSchema(authProvider === AuthProviders.MagicLogin),
		),
	});

	async function onSubmit(data: SignUpFormData) {
		try {
			setLoading(true);

			if (previewMode) {
				await delay(1000);
				setLoading(false);
				return;
			}

			const result = await signUp(data);

			if (!result || result?.statusCode) {
				toast({
					title: 'Sign up error',
					description: result?.message || result?.error || 'An error occurred',
					variant: 'destructive',
				});
				setLoading(false);
			} else {
				router.replace(result.emailSent ? '/auth/magic' : '/');
			}
		} catch (e) {
			console.error('Error signUpForm.onSubmit: ', e);
			setLoading(false);
		}
	}

	return (
		<>
			<SSOSocialButtons />
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="tl-grid tl-w-full tl-items-center tl-gap-5">
					<InputWrapper>
						<Input
							id="fullName"
							placeholder="e.g.: John Doe"
							size="lg"
							label="Full Name"
							error={form.formState.errors.fullName?.message}
							{...form.register('fullName')}
						/>
					</InputWrapper>

					<InputWrapper>
						<Input
							id="email"
							placeholder="you@example.com"
							size="lg"
							label="Email"
							error={form.formState.errors.email?.message}
							{...form.register('email')}
						/>
					</InputWrapper>

					{authProvider === AuthProviders.EmailAndPassword && (
						<InputWrapper>
							<div className="tl-flex tl-justify-between">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input
								id="password"
								type="password"
								placeholder="••••••••••••"
								size="lg"
								error={form.formState.errors.password?.message}
								{...form.register('password')}
							/>
						</InputWrapper>
					)}
				</div>

				<Button
					className="tl-w-full tl-mt-8"
					loading={loading}
					style={{ backgroundColor: styles.primaryColor }}
				>
					{loading ? 'Creating your account...' : 'Continue'}
				</Button>
			</form>
			{enableSignUp && (
				<div className="tl-flex tl-justify-center tl-mt-4">
					<Typo variant="sm" className="tl-text-muted-foreground">
						Already have an account?{' '}
						<Link
							href={previewMode ? '#' : '/auth/login'}
							className="tl-text-foreground hover:tl-underline"
						>
							Log in
						</Link>
					</Typo>
				</div>
			)}
		</>
	);
}
