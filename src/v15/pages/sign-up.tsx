import SignUpForm from './components/sign-up-form';
import LandingGrid from './components/landing-grid';
import AuthHeader from './components/auth-header';
import { cn } from '../../ui/core/utils';

interface Props {
  isPreview?: boolean;
}

export default function SignUp({ isPreview = false }: Props) {
  return (
    <div
      className={cn('flex md:items-center justify-center', {
        'h-[40rem]': isPreview,
        'h-screen': !isPreview,
      })}
    >
      <LandingGrid />
      <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px] relative">
        <AuthHeader
          title="Create an account"
          description="signUp"
          className="mb-14"
        />
        <SignUpForm />
      </div>
    </div>
  );
}
