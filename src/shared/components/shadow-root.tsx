'use client';

import React from 'react';
import { createPortal } from 'react-dom';

export default function ShadowRoot({
  children,
  appendCSS = [],
}: {
  children: React.ReactNode;
  appendCSS?: string[];
}) {
  const shadowHostRef = React.useRef<any>(null);
  const [shadowRoot, setShadowRoot] = React.useState(null);

  React.useEffect(() => {
    if (
      shadowHostRef.current &&
      !shadowRoot &&
      !shadowHostRef.current?.shadowRoot
    ) {
      const root = shadowHostRef.current.attachShadow({ mode: 'open' });
      setShadowRoot(root);

      appendCSS.forEach((css) => {
        const style = document.createElement('style');
        style.textContent = css;
        root.appendChild(style);
      });
    }
  }, [shadowRoot]);

  return (
    <div ref={shadowHostRef}>
      {shadowRoot && createPortal(children, shadowRoot)}
    </div>
  );
}
