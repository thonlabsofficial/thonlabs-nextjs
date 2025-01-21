'use client';

import { Button } from '../../../ui/components/button';

export function CloseThisPageButton() {
  return (
    <Button
      type="button"
      variant={'secondary'}
      onClick={() => {
        window.close();
      }}
    >
      Close this page
    </Button>
  );
}
