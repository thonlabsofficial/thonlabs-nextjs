'use client';

import { Button } from '../../../ui/components/button';
import { useEnvironmentData } from '../../hooks/use-environment-data';

export function CloseThisPageButton() {
	const { styles } = useEnvironmentData();

	return (
		<Button
			type="button"
			onClick={() => {
				window.close();
			}}
			style={{ backgroundColor: styles.primaryColor }}
		>
			Close this page
		</Button>
	);
}
