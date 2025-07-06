'use client';

import { Button } from '../../../ui/components/button';
import { Input, InputWrapper } from '../../../ui/components/input';
import { Label } from '../../../ui/components/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { LoginFormData, LoginFormSchema } from '../validators/auth-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../actions/auth-actions';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../../ui/hooks/use-toast';
import { Typo } from '../../../ui/components/typo';
import { AuthProviders } from '../../../shared/interfaces/environment-data';
import { useEnvironmentData } from '../../hooks/use-environment-data';
import { delay } from '../../../shared/utils/helpers';
import { usePreviewMode } from '../../../shared/hooks/use-preview-mode';
import SSOSocialButtons from '../../../shared/components/sso-social-buttons';

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { authProvider, enableSignUp, styles } = useEnvironmentData();
  const { previewMode } = usePreviewMode();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(
      LoginFormSchema(authProvider === AuthProviders.MagicLogin)
    ),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setLoading(true);

      if (previewMode) {
        await delay(1000);
        setLoading(false);
        return;
      }

      const result = await login(data);

      if (!result || result?.statusCode) {
        toast({
          title: 'Log in error',
          description:
            result?.message || result?.error || 'Invalid credentials',
          variant: 'destructive',
        });
        setLoading(false);
      } else {
        router.replace(result.emailSent ? '/auth/magic' : '/');
      }
    } catch (e) {
      console.error('Error loginForm.onSubmit: ', e);
      setLoading(false);
    }
  }

  return (
    <>
      <SSOSocialButtons />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="tl-grid tl-w-full tl-items-center tl-gap-5">
          <InputWrapper>
            <Input
              id="email"
              placeholder="you@example.com"
              size="lg"
              label="Email"
              error={form.formState.errors.email?.message}
              {...form.register('email')}
            />
          </InputWrapper>

          {authProvider === AuthProviders.EmailAndPassword && (
            <InputWrapper>
              <div className="tl-flex tl-justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  className={`tl-text-gray-500 hover:tl-text-gray-900 dark:hover:tl-text-gray-50
              tl-transition-all tl-duration-200 tl-ease-in-out 
              tl-text-sm tl-font-medium tl-leading-none tl-underline-offset-4 hover:tl-underline`}
                  href={previewMode ? '#' : '/auth/reset-password'}
                  tabIndex={-1}
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                size="lg"
                error={form.formState.errors.password?.message}
                {...form.register('password')}
              />
            </InputWrapper>
          )}
        </div>

        <Button
          className="tl-w-full tl-mt-8"
          loading={loading}
          style={{ backgroundColor: styles.primaryColor }}
        >
          {loading ? 'Logging in...' : 'Continue'}
        </Button>
      </form>
      {enableSignUp && (
        <div className="tl-flex tl-justify-center tl-mt-4">
          <Typo variant="sm" className="tl-text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href={previewMode ? '#' : '/auth/sign-up'}
              className="tl-text-foreground hover:tl-underline"
            >
              Sign up
            </Link>
          </Typo>
        </div>
      )}
    </>
  );
}
