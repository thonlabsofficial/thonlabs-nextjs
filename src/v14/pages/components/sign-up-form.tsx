'use client';

import React from 'react';
import { Button } from '../../../ui/components/button';
import { Input, InputWrapper } from '../../../ui/components/input';
import { Label } from '../../../ui/components/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  SignUpFormData,
  SignUpFormSchema,
} from '../validators/auth-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '../actions/auth-actions';
import { useRouter } from 'next/navigation';
import { useToast } from '../../../ui/hooks/use-toast';
import { Typo } from '../../../ui/components/typo';
import { useEnvironmentData } from '../../hooks/use-environment-data';
import { AuthProviders } from '../../../shared/interfaces/environment-data';
import SSOSocialButtons from '../../../shared/components/sso-social-buttons';

export default function SignUpForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { authProvider, enableSignUp, styles } = useEnvironmentData();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(
      SignUpFormSchema(authProvider === AuthProviders.MagicLogin)
    ),
  });

  async function onSubmit(data: SignUpFormData) {
    try {
      setLoading(true);

      const result = await signUp(data);

      if (!result || result?.statusCode) {
        toast({
          title: 'Sign up error',
          description: result?.message || result?.error || 'An error occurred',
          variant: 'destructive',
        });
        setLoading(false);
      } else {
        router.replace(result.emailSent ? '/auth/magic' : '/');
      }
    } catch (e) {
      console.error('Error signUpForm.onSubmit: ', e);
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
              id="fullName"
              placeholder="e.g.: John Doe"
              size="lg"
              label="Full Name"
              error={form.formState.errors.fullName?.message}
              {...form.register('fullName')}
            />
          </InputWrapper>

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
          {loading ? 'Creating your account...' : 'Continue'}
        </Button>
      </form>
      {enableSignUp && (
        <div className="tl-flex tl-justify-center tl-mt-4">
          <Typo variant="sm" className="tl-text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="tl-text-foreground hover:tl-underline"
            >
              Log in
            </Link>
          </Typo>
        </div>
      )}
    </>
  );
}
