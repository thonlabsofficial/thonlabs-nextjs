export enum SSOSocialProvider {
  GOOGLE = 'google',
}

export interface SSOSocial {
  provider: SSOSocialProvider;
  clientId: string;
  redirectUri: string;
}
