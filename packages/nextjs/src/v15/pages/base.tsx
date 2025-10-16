import SSORedirect from '../../shared/components/sso-redirect';
import type { SSOSocialProvider } from '../../shared/interfaces/sso-social';
import ConfirmEmailValidator from './confirm-email-validator';
import Login from './login';
import MagicSent from './magic-sent';
import MagicValidator from './magic-validator';
import ResetPasswordCreate from './reset-password-create';
import ResetPasswordRequire from './reset-password-require';
import SignUp from './sign-up';

export async function ThonLabsAuthPage({
	params,
	searchParams,
}: {
	params: Promise<{ thonlabs: string[] }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { thonlabs } = await params;
	const { inviteFlow, code } = await searchParams;
	const [route, param] = thonlabs || [];
	const inviteFlowParam = inviteFlow === 'true';
	const inviteFlowEmail = Buffer.from(
		(inviteFlow as string) || '',
		'base64',
	).toString('utf-8');

	if (route === 'login') return <Login />;
	if (route === 'magic' && param)
		return <MagicValidator token={param} inviteFlow={inviteFlowParam} />;
	if (route === 'magic') return <MagicSent />;
	if (route === 'sign-up') return <SignUp />;
	if (route === 'confirm-email' && param)
		return <ConfirmEmailValidator token={param} />;
	if (route === 'reset-password' && param)
		return (
			<ResetPasswordCreate token={param} inviteFlowEmail={inviteFlowEmail} />
		);
	if (route === 'reset-password') return <ResetPasswordRequire />;
	if (route === 'sso' && param)
		return (
			<SSORedirect
				provider={param as SSOSocialProvider}
				code={code as string}
			/>
		);
}
