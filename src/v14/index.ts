import {
	AuthProviders,
	type EnvironmentData,
} from '../shared/interfaces/environment-data';
import { SSOSocialProvider } from '../shared/interfaces/sso-social';
import { APIResponseCodes, type ErrorResponse } from '../shared/utils/errors';
import { forwardSearchParams } from '../shared/utils/helpers';
import { ThonLabsWrapper } from './core/thonlabs-wrapper';
import { useEnvironmentData } from './hooks/use-environment-data';
import { useSession } from './hooks/use-session';
import type { SessionData } from './interfaces/session-data';
import type { User } from './interfaces/user';
import { ThonLabsAuthPage } from './pages/base';
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
