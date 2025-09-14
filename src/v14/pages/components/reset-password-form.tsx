'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import Log from '../../../shared/utils/log';
import { Button } from '../../../ui/components/button';
import { Input, InputWrapper } from '../../../ui/components/input';
import { useToast } from '../../../ui/hooks/use-toast';
import { useEnvironmentData } from '../../hooks/use-environment-data';
import { resetPassword } from '../actions/auth-actions';
import {
  type ResetPasswordFormData,
  ResetPasswordFormSchema
} from '../validators/auth-validators';

export default function ResetPasswordForm() {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const { styles } = useEnvironmentData();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormSchema)
  });

  async function onSubmit(data: ResetPasswordFormData) {
    try {
      setLoading(true);

      await resetPassword(data);

      toast({
        title: 'Email sent',
        description:
          'Check the link in your email inbox to proceed with resetting your password.'
      });

      form.reset();
    } catch (e: any) {
      toast({
        title: 'Error sending email',
        description: 'An error ocurred when starting the reset password flow.',
        variant: 'destructive'
      });
      Log.error({
        action: 'resetPassword',
        message: e.message
      });
    } finally {
      setLoading(false);
    }
  }

  return (
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
      </div>

      <Button
        className="tl-w-full tl-mt-4"
        loading={loading}
        style={{ backgroundColor: styles.primaryColor }}
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </form>
  );
}
