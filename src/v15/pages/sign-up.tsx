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
      className={cn('flex items-center justify-center', {
        'h-[50rem]': isPreview,
        'h-screen': !isPreview,
      })}
    >
      <LandingGrid />
      <div className="sm:pt-0 px-3 w-full sm:max-w-[400px] relative md:-mt-16">
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
