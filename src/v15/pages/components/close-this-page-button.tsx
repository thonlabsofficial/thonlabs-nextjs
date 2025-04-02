'use client';

import { Button } from '../../../ui/components/button';
import { usePreviewMode } from '../../../shared/hooks/use-preview-mode';
import { useEnvironmentData } from '../../hooks/use-environment-data';

export function CloseThisPageButton() {
  const { previewMode } = usePreviewMode();
  const { styles } = useEnvironmentData();

  return (
    <Button
      type="button"
      onClick={() => {
        if (!previewMode) {
          window.close();
        }
      }}
      style={{ backgroundColor: styles.primaryColor }}
    >
      Close this page
    </Button>
  );
}
