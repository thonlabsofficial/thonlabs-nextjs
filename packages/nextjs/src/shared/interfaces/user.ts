import type { Organization } from '../../shared/interfaces/organization';

export interface User {
	id: string;
	email: string;
	profilePicture?: string;
	fullName: string;
	active: boolean;
	lastSignIn: Date;
	createdAt: string;
	updatedAt: string;
	environmentId: string;
	emailConfirmed: boolean;
	invitedAt: Date;
	metadata: Record<string, any>;
	organization: Organization | null;
}
