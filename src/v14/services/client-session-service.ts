import Cookies from 'js-cookie';
import * as jose from 'jose';
import { intAPI } from '../../shared/utils/api';
import { User } from '../interfaces/user';
import { APIResponseCodes } from '../../shared/utils/errors';
import { delay } from '../../shared/utils/helpers';

const ClientSessionService = {
  refreshing: false,

  isValid() {
    const accessToken = Cookies.get('tl_session');

    if (!accessToken) {
      return false;
    }

    const { exp } = jose.decodeJwt(accessToken as string);
    const sessionValid = (exp as number) * 1000 > new Date().getTime();

    return sessionValid;
  },
  getSession(): User | null {
    const accessToken = Cookies.get('tl_session');

    if (!accessToken) {
      return null;
    }

    const session = jose.decodeJwt<User>(accessToken as string);

    return {
      id: session.sub as string,
      fullName: session.fullName,
      email: session.email,
      profilePicture: session.profilePicture,
    };
  },
  redirectToLogout() {
    intAPI('/api/auth/logout', { method: 'POST' }).then(() => {
      window.location.href = `/auth/login?reason=${APIResponseCodes.SessionExpired}`;
    });
  },
  async logout() {
    await intAPI('/api/auth/logout', { method: 'POST' });
    await delay(200);
    window.location.href = '/auth/login';
  },
  async generateAccessToken() {
    const response = await intAPI('/api/auth/refresh', { method: 'POST' });
    const { accessToken } = await response.json();
    Cookies.set('tl_session', accessToken);
    return accessToken;
  },
};

export default ClientSessionService;
