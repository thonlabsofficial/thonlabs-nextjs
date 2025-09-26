import { ThonLabsEnvDataProvider } from './shared/components/thonlabs-env-data-provider';
import { usePreviewMode } from './shared/hooks/use-preview-mode';
import {
	AuthProviders,
	type EnvironmentData,
} from './shared/interfaces/environment-data';
import {
	SSOSocial,
	SSOSocialKeys,
	SSOSocialProvider,
} from './shared/interfaces/sso-social';
import { ThonLabsPreviewProvider } from './shared/providers/thonlabs-preview-provider';
import { APIResponseCodes, type ErrorResponse } from './shared/utils/errors';
import { forwardSearchParams } from './shared/utils/helpers';
import { ThonLabsWrapper } from './v15/core/thonlabs-wrapper';
import { useEnvironmentData } from './shared/hooks/use-environment-data';
import { useSession } from './shared/hooks/use-session';
import type { SessionData } from './shared/interfaces/session-data';
import type { User } from './shared/interfaces/user';
import { ThonLabsAuthPage } from './v15/pages/base';
import { ThonLabsAuthPagePreview } from './v15/pages/base-preview';
import ClientSessionService from './v15/services/client-session-service';

const getAccessToken = ClientSessionService.getAccessToken;

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
	ThonLabsPreviewProvider,
	ThonLabsEnvDataProvider,
	SSOSocialProvider,
	SSOSocial,
	SSOSocialKeys,
	getAccessToken,
};
