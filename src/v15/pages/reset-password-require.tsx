import { Typo } from '../../ui/components/typo';
import { Metadata } from 'next';
import LandingGrid from './components/landing-grid';
import ResetPasswordForm from './components/reset-password-form';
import Link from 'next/link';
import AuthHeader from './components/auth-header';
import { cn } from '../../ui/core/utils';

export const metadata: Metadata = {
  title: 'Forgot your password? Reset!',
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  isPreview?: boolean;
}

export default function ResetPasswordRequire({ isPreview = false }: Props) {
  return (
    <div
      className={cn('flex items-center justify-center', {
        'h-[30rem]': isPreview,
        'h-screen': !isPreview,
      })}
    >
      <LandingGrid />
              <div className="sm:tl-pt-0 tl-px-3 tl-w-full sm:tl-max-w-[400px] tl-relative md:tl--mt-16">
        <AuthHeader
          title="Reset Your Password"
          description="Please provide your email address, and we'll send you a secure
            link to reset your password."
          className="mb-10"
        />
        <ResetPasswordForm />
        <footer className="tl-text-center tl-mt-4">
          <Typo variant={'muted'} className="!tl-text-gray-400">
            Remember your password?{' '}
            <Link
              href="/auth/login"
              className="tl-text-gray-900 dark:tl-text-gray-50 tl-underline-offset-4 hover:tl-underline"
            >
              Log in
            </Link>
            .
          </Typo>
        </footer>
      </div>
    </div>
  );
}
