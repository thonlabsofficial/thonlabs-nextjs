import {
  EnvironmentData,
  AuthProviders,
} from '../shared/interfaces/environment-data';
import { User } from './interfaces/user';
import { SessionData } from './interfaces/session-data';
import { APIResponseCodes, ErrorResponse } from '../shared/utils/errors';
import { useEnvironmentData } from './hooks/use-environment-data';
import { useSession } from './hooks/use-session';
import { ThonLabsWrapper } from './core/thonlabs-wrapper';
import { ThonLabsAuthPage } from './pages/base';
import { forwardSearchParams } from '../shared/utils/helpers';
import { SSOSocialProvider } from '../shared/interfaces/sso-social';
import ClientSessionService from './services/client-session-service';

const getAccessToken = ClientSessionService.getAccessToken;
const generateAccessToken = ClientSessionService.generateAccessToken;

export type { EnvironmentData, User, SessionData, ErrorResponse };

export {
  AuthProviders,
  ThonLabsWrapper,
  ThonLabsAuthPage,
  useEnvironmentData,
  useSession,
  forwardSearchParams,
  APIResponseCodes,
  SSOSocialProvider,
  getAccessToken,
  generateAccessToken,
};
