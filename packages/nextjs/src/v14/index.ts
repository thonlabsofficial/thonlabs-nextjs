import {
	AuthProviders,
	type EnvironmentData,
} from '../shared/interfaces/environment-data';
import { SSOSocialProvider } from '../shared/interfaces/sso-social';
import { APIResponseCodes, type ErrorResponse } from '../shared/utils/errors';
import { forwardSearchParams } from '../shared/utils/helpers';
import { ThonLabsWrapper } from '../v14/components/thonlabs-wrapper';
import { useEnvironmentData } from '../shared/hooks/use-environment-data';
import { useSession } from '../shared/hooks/use-session';
import type { SessionData } from '../shared/interfaces/session-data';
import type { User } from '../shared/interfaces/user';
import { ThonLabsAuthPage } from './pages/base';
import ClientSessionService from './services/client-session-service';

const getAccessToken = ClientSessionService.getAccessToken;

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
};
