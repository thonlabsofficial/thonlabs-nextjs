import {
  EnvironmentData,
  AuthProviders,
} from './shared/interfaces/environment-data';
import { User } from './v15/interfaces/user';
import { SessionData } from './v15/interfaces/session-data';
import { APIResponseCodes, ErrorResponse } from './shared/utils/errors';
import { useEnvironmentData } from './v15/hooks/use-environment-data';
import { useSession } from './v15/hooks/use-session';
import { ThonLabsWrapper } from './v15/core/thonlabs-wrapper';
import { ThonLabsAuthPage } from './v15/pages/base';
import { ThonLabsAuthPagePreview } from './v15/pages/base-preview';
import { forwardSearchParams } from './shared/utils/helpers';
import { usePreviewMode } from './shared/hooks/use-preview-mode';
import ClientSessionService from './v15/services/client-session-service';
import {
  SSOSocialProvider,
  SSOSocial,
  SSOSocialKeys,
} from './shared/interfaces/sso-social';

const getAccessToken = ClientSessionService.getAccessToken;
const generateAccessToken = ClientSessionService.generateAccessToken;

export type { EnvironmentData, User, SessionData, ErrorResponse };

export {
  AuthProviders,
  APIResponseCodes,
  ThonLabsWrapper,
  ThonLabsAuthPage,
  useEnvironmentData,
  useSession,
  forwardSearchParams,
  usePreviewMode,
  ThonLabsAuthPagePreview,
  SSOSocialProvider,
  SSOSocial,
  SSOSocialKeys,
  getAccessToken,
  generateAccessToken,
};
