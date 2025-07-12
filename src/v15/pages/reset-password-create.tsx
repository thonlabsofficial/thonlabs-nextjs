import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { labsPublicAPI } from '../../shared/utils/api';
import { cn } from '../../ui/core/utils';
import AuthHeader from './components/auth-header';
import CreateNewPasswordForm from './components/create-new-password-form';
import LandingGrid from './components/landing-grid';

export const metadata: Metadata = {
	title: 'Create a new password',
	robots: {
		index: false,
		follow: false,
	},
};

interface Props {
	token: string;
	inviteFlowEmail?: string;
	isPreview?: boolean;
}

export default async function ResetPasswordCreate({
	token,
	inviteFlowEmail,
	isPreview = false,
}: Props) {
	// Validates the token
	try {
		await labsPublicAPI(`/auth/reset-password/${token}`);
	} catch (e) {
		notFound();
	}

	return (
		<div
			className={cn('tl-flex tl-items-center tl-justify-center', {
				'tl-h-[30rem]': isPreview,
				'tl-h-screen': !isPreview,
			})}
		>
			<LandingGrid />
			<div className="sm:tl-pt-0 tl-px-3 tl-w-full sm:tl-max-w-[400px] tl-relative md:tl--mt-16">
				<AuthHeader
					title="Create a New Password"
					description="Please complete the form below to create a new password for your account."
					className="tl-mb-10"
				/>
				<CreateNewPasswordForm token={token} email={inviteFlowEmail} />
			</div>
		</div>
	);
}
