import '../../shared/styles/globals.css';

import SSORedirect from '../../shared/components/sso-redirect';
import { SSOSocialProvider } from '../../shared/interfaces/sso-social';
import ConfirmEmailValidator from './confirm-email-validator';
import Login from './login';
import MagicSent from './magic-sent';
import MagicValidator from './magic-validator';
import RefreshValidator from './refresh-validator';
import ResetPasswordCreate from './reset-password-create';
import ResetPasswordRequire from './reset-password-require';
import SignUp from './sign-up';

export function ThonLabsAuthPage({
  params,
  searchParams,
}: {
  params: { thonlabs: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [route, param] = params.thonlabs || [];
  const dest = searchParams?.dest as string;
  const inviteFlow = searchParams?.inviteFlow === 'true';
  const inviteFlowEmail = Buffer.from(
    (searchParams?.inviteFlow as string) || '',
    'base64'
  ).toString('utf-8');
  const code = searchParams?.code as string;

  if (route === 'login') return <Login />;
  if (route === 'magic' && param)
    return <MagicValidator token={param} inviteFlow={inviteFlow} />;
  if (route === 'magic') return <MagicSent />;
  if (route === 'sign-up') return <SignUp />;
  if (route === 'confirm-email' && param)
    return <ConfirmEmailValidator token={param} />;
  if (route === 'reset-password' && param)
    return (
      <ResetPasswordCreate token={param} inviteFlowEmail={inviteFlowEmail} />
    );
  if (route === 'reset-password') return <ResetPasswordRequire />;
  if (route === 'refresh' && dest) return <RefreshValidator dest={dest} />;
  if (route === 'sso' && param)
    return (
      <SSORedirect
        provider={param as SSOSocialProvider}
        code={code as string}
      />
    );
}
