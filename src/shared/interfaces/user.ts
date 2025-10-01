import type { Organization } from '../../shared/interfaces/organization';

export interface User {
	id: string;
	email: string;
	profilePicture?: string;
	fullName: string;
	organization: Organization | null;
	metadata: Record<string, any>;
}
