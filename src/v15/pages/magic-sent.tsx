import LandingGrid from './components/landing-grid';
import AuthHeader from './components/auth-header';
import { CloseThisPageButton } from './components/close-this-page-button';
import { cn } from '../../ui/core/utils';

interface Props {
  isPreview?: boolean;
}

export default function MagicSent({ isPreview = false }: Props) {
  return (
    <>
      <div
        className={cn('flex items-center justify-center', {
          'h-[30rem]': isPreview,
          'h-screen': !isPreview,
        })}
      >
        <LandingGrid />
        <div className="sm:pt-0 px-3 w-full sm:max-w-[400px] relative md:-mt-16">
          <AuthHeader
            title="Check your email"
            description="We've sent you a magic link to log in to Thon Labs, you can close this page."
            className="mb-14"
          />
          <CloseThisPageButton />
        </div>
      </div>
    </>
  );
}
