import { RedirectType, redirect } from 'next/navigation';
import type { SSOSocialProvider } from '../interfaces/sso-social';

interface Props {
	provider: SSOSocialProvider;
	code: string;
}

export default async function SSORedirect({ provider, code }: Props) {
	redirect(
		`/api/auth/sso/${Buffer.from(`${provider}::${code}`).toString('base64')}`,
		RedirectType.replace,
	);
	return null;
}
