import { useEnvironmentData } from '../hooks/use-environment-data';
import AuthHeader from './components/auth-header';
import { CloseThisPageButton } from './components/close-this-page-button';
import LandingGrid from './components/landing-grid';

export default function MagicSent() {
  const { appName } = useEnvironmentData();

  return (
    <div className="tl-flex md:tl-items-center tl-justify-center">
      <LandingGrid />
      <div className="sm:tl-pt-0 tl-px-3 tl-w-full sm:tl-max-w-[400px] tl-relative tl--mt-16">
        <AuthHeader
          title="Check your email"
          description={`We've sent you a magic link to log in to ${appName}, you can close this page.`}
          className="tl-mb-14"
        />
        <CloseThisPageButton />
      </div>
    </div>
  );
}
