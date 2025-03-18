export const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/magic",
  "/auth/reset-password",
  "/auth/logout",
  "/auth/confirm-email",
  "/auth/refresh",
];

export const publicRoutes = [
  "/api/auth/logout",
  "/api/auth/refresh",
  "/api/auth/magic",
  "/api/auth/confirm-email",
  ...authRoutes,
];

export const passwordPatterns = {
  middleStrength: new RegExp(
    "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$"
  ),
};
