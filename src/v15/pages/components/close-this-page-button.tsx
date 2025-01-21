'use client';

import { Button } from '../../../ui/components/button';
import { usePreviewMode } from '../../../shared/hooks/use-preview-mode';

export function CloseThisPageButton() {
  const { previewMode } = usePreviewMode();

  return (
    <Button
      type="button"
      variant={'secondary'}
      onClick={() => {
        if (!previewMode) {
          window.close();
        }
      }}
    >
      Close this page
    </Button>
  );
}
