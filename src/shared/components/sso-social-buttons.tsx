'use client';

import { useEnvironmentData } from '../../v15/hooks/use-environment-data';
import SSOGoogle from '../components/sso-google';
import { usePreviewMode } from '../hooks/use-preview-mode';
import { type SSOSocial, SSOSocialProvider } from '../interfaces/sso-social';

export default function SSOSocialButtons() {
	const { ssoProviders, activeSSOProviders } = useEnvironmentData();
	const { previewMode } = usePreviewMode();

	if (!ssoProviders || activeSSOProviders?.length === 0) {
		return null;
	}

	return (
		<div className="tl-flex tl-flex-col tl-gap-4 tl-mb-4">
			<div className="tl-flex tl-flex-col tl-gap-2">
				{activeSSOProviders.includes(SSOSocialProvider.GOOGLE) && (
					<SSOGoogle
						{...(!previewMode ? ssoProviders.google : ({} as SSOSocial))}
					/>
				)}
			</div>
			<div className="tl-flex tl-items-center tl-gap-3">
				<div className="tl-flex-1 tl-h-px tl-bg-border tl-mt-1" />
				<span className="tl-text-sm tl-text-muted-foreground">or</span>
				<div className="tl-flex-1 tl-h-px tl-bg-border tl-mt-1" />
			</div>
		</div>
	);
}
