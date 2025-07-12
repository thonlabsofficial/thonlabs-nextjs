import { RedirectType, redirect } from 'next/navigation';

export default function Logout() {
	redirect('/api/auth/logout', RedirectType.replace);
	return null;
}
