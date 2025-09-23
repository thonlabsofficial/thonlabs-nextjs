import React from 'react';
import type { EnvironmentData } from '../../shared/interfaces/environment-data';
import { ThonLabsEnvDataContext } from '../../shared/components/thonlabs-env-data-provider';

export function useEnvironmentData() {
	const { environmentData } = React.useContext(ThonLabsEnvDataContext);
	return environmentData as EnvironmentData;
}
