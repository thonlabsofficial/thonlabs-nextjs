'use client';

import { Button } from '../../../ui/components/button';
import { useEnvironmentData } from '../../hooks/use-environment-data';

export function CloseThisPageButton() {
  const { primaryColor } = useEnvironmentData();

  return (
    <Button
      type="button"
      onClick={() => {
        window.close();
      }}
      style={{ backgroundColor: primaryColor }}
    >
      Close this page
    </Button>
  );
}
