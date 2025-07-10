import Login from './login';
import MagicSent from './magic-sent';
import ResetPasswordCreate from './reset-password-create';
import ResetPasswordRequire from './reset-password-require';
import SignUp from './sign-up';

export function ThonLabsAuthPagePreview({
	params,
	searchParams,
}: {
	params: { thonlabs: string[] };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { thonlabs } = params;
	const { inviteFlow } = searchParams;
	const [route, param] = thonlabs || [];
	const inviteFlowEmail = Buffer.from(
		(inviteFlow as string) || '',
		'base64',
	).toString('utf-8');

	return (
		<div className="tl-bg-background tl-text-text tl-h-full">
			{route === 'login' && <Login isPreview />}
			{route === 'magic' && <MagicSent isPreview />}
			{route === 'sign-up' && <SignUp isPreview />}
			{route === 'reset-password' && param && (
				<ResetPasswordCreate
					token={param}
					inviteFlowEmail={inviteFlowEmail}
					isPreview
				/>
			)}
			{route === 'reset-password' && <ResetPasswordRequire isPreview />}
		</div>
	);
}
