import LoginForm from './components/login-form';
import LandingGrid from './components/landing-grid';
import AuthHeader from './components/auth-header';
import { cn } from '../../ui/core/utils';

interface Props {
  isPreview?: boolean;
}

export default function Login({ isPreview = false }: Props) {
  return (
    <>
      <div
        className={cn('flex items-center justify-center', {
          'h-[53.1rem]': isPreview,
          'h-screen': !isPreview,
        })}
      >
        <LandingGrid />
        <div className="sm:pt-0 px-3 w-full sm:max-w-[400px] relative md:-mt-20">
          <AuthHeader title="Welcome" description="login" className="mb-14" />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
