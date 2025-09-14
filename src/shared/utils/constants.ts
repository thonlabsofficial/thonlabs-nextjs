export const authRoutes = [
  '/auth/login',
  '/auth/logout',
  '/auth/signup',
  '/auth/sign-up',
  '/auth/magic',
  '/auth/reset-password',
  '/auth/logout',
  '/auth/confirm-email',
  '/auth/refresh',
  '/auth/sso'
];

export const publicRoutes = [
  '/auth/logout',
  '/api/auth/logout',
  '/api/auth/refresh',
  '/api/auth/magic',
  '/api/auth/confirm-email',
  '/api/auth/sso',
  ...authRoutes
];

export const passwordPatterns = {
  middleStrength:
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
};
