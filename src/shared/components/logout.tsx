import { RedirectType, redirect } from 'next/navigation';
import { APIResponseCodes } from '../utils/errors';

export default function Logout() {
	redirect('/api/auth/logout', RedirectType.replace);
	return null;
}
