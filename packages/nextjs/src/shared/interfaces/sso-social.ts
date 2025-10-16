export type SSOSocialKeys = 'clientId' | 'secretKey' | 'redirectURI';

export enum SSOSocialProvider {
	GOOGLE = 'google',
}

export interface SSOSocial {
	clientId: string;
	secretKey: string;
	redirectURI: string;
}
