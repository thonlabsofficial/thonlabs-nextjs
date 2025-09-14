'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import SSOSocialButtons from '../../../shared/components/sso-social-buttons';
import { AuthProviders } from '../../../shared/interfaces/environment-data';
import { Button } from '../../../ui/components/button';
import { Input, InputWrapper } from '../../../ui/components/input';
import { Label } from '../../../ui/components/label';
import { Typo } from '../../../ui/components/typo';
import { useToast } from '../../../ui/hooks/use-toast';
import { useEnvironmentData } from '../../hooks/use-environment-data';
import { login } from '../actions/auth-actions';
import {
  type LoginFormData,
  LoginFormSchema
} from '../validators/auth-validators';

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { authProvider, enableSignUp, styles, redirectOnAuthenticated } =
    useEnvironmentData();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(
      LoginFormSchema(authProvider === AuthProviders.MagicLogin)
    )
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setLoading(true);

      const result = await login(data);

      if (!result || result?.statusCode) {
        toast({
          title: 'Log in error',
          description:
            result?.message || result?.error || 'Invalid credentials',
          variant: 'destructive'
        });
        setLoading(false);
      } else {
        router.replace(
          result.emailSent ? '/auth/magic' : redirectOnAuthenticated || '/'
        );
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
                  href="/auth/reset-password"
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
              href="/auth/sign-up"
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
