import React from 'react';
import type { EnvironmentData } from '../../shared/interfaces/environment-data';
import { ThonLabsSessionContext } from '../core/thonlabs-session-provider';

export function useEnvironmentData() {
	const { environmentData } = React.useContext(ThonLabsSessionContext);

	return environmentData as EnvironmentData;
}
