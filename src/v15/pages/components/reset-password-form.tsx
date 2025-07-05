'use client';

import { Button } from '../../../ui/components/button';
import { Input, InputWrapper } from '../../../ui/components/input';
import { useForm } from 'react-hook-form';
import {
  ResetPasswordFormSchema,
  ResetPasswordFormData,
} from '../validators/auth-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useToast } from '../../../ui/hooks/use-toast';
import Log from '../../../shared/utils/log';
import { resetPassword } from '../actions/auth-actions';
import { delay } from '../../../shared/utils/helpers';
import { usePreviewMode } from '../../../shared/hooks/use-preview-mode';
import { useEnvironmentData } from '../../hooks/use-environment-data';

export default function ResetPasswordForm() {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const { styles } = useEnvironmentData();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const { previewMode } = usePreviewMode();

  async function onSubmit(data: ResetPasswordFormData) {
    try {
      setLoading(true);

      if (previewMode) {
        await delay(1000);
        setLoading(false);
        return;
      }

      await resetPassword(data);

      toast({
        title: 'Reset password email sent',
        description:
          'Check the link in your email inbox to proceed with resetting your password.',
      });

      form.reset();
    } catch (e: any) {
      toast({
        title: 'Error resetting password',
        description:
          'An error occurred when starting the reset password flow, please try again.',
        variant: 'destructive',
      });
      Log.error({
        action: 'resetPassword',
        message: e.message || e.statusText,
        statusCode: e.status,
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
