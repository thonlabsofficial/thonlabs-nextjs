import React from 'react';
import type { EnvironmentData } from '../interfaces/environment-data';
import { ThonLabsEnvDataContext } from '../components/thonlabs-env-data-provider';

export function useEnvironmentData() {
	const { environmentData } = React.useContext(ThonLabsEnvDataContext);
	return environmentData as EnvironmentData;
}
