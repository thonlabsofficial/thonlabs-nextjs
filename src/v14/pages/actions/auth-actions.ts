'use server';

import { labsPublicAPI } from '../../../shared/utils/api';
import type { ErrorResponse } from '../../../shared/utils/errors';
import Log from '../../../shared/utils/log';
import type { SessionData } from '../../interfaces/session-data';
import ServerSessionService from '../../services/server-session-service';
import type {
  CreateNewPasswordFormData,
  LoginFormData,
  ResetPasswordFormData,
  SignUpFormData
} from '../validators/auth-validators';

type DataReturn = SessionData & ErrorResponse;

export async function login(
  payload: LoginFormData
): Promise<DataReturn | null> {
  try {
    const response = await labsPublicAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data: SessionData = await response.json();

    if (data) {
      ServerSessionService.create(data);
    }

    return data;
  } catch (e: any) {
    Log.error({
      action: 'login',
      message: e.message
    });
    return null;
  }
}

export async function signUp(
  payload: SignUpFormData
): Promise<DataReturn | null> {
  try {
    const response = await labsPublicAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    const data: SessionData = await response.json();

    if (data) {
      ServerSessionService.create(data);
    }

    return data;
  } catch (e: any) {
    Log.error({
      action: 'signUp',
      message: e.message
    });
    return null;
  }
}

export async function createNewPassword(
  token: string,
  payload: CreateNewPasswordFormData
) {
  try {
    const response = await labsPublicAPI(`/auth/reset-password/${token}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to create new password');
    }
  } catch (e: any) {
    Log.error({
      action: 'createNewPassword',
      message: e.message
    });
    return null;
  }
}

export async function resetPassword(payload: ResetPasswordFormData) {
  try {
    const response = await labsPublicAPI('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to send reset password email');
    }
  } catch (e: any) {
    Log.error({
      action: 'resetPassword',
      statusCode: e.status,
      message: e.message || e.statusText
    });
    return null;
  }
}
