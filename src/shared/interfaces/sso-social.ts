export enum SSOSocialProvider {
  GOOGLE = 'google',
}

export interface SSOSocial {
  clientId: string;
  redirectURI: string;
}
