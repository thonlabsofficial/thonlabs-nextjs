export type SessionData = {
	userId: string;
	token: string;
	tokenExpiresIn: number;
	refreshToken: string;
	refreshTokenExpiresIn: number;
	emailSent?: boolean;
};
