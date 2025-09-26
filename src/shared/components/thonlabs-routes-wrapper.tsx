'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { cn } from '../../ui/core/utils';
import ToasterObservableWrapper from './toaster-observable-wrapper';
import Fonts from './fonts';
import { usePreviewMode } from '../hooks/use-preview-mode';

export default function ThonLabsRoutesWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const { resolvedTheme } = useTheme();
	const { previewMode } = usePreviewMode();

	React.useEffect(() => {
		const style = document.createElement('style');
		style.textContent = `
      body {
        margin: 0;
        padding: 0;
      }
    `;
		document.head.appendChild(style);
	}, []);

	return (
		<>
			{!previewMode && (
				<>
					<Fonts />
					<ToasterObservableWrapper />
				</>
			)}
			<div
				className={cn(
					previewMode ? '' : resolvedTheme === 'dark' ? 'dark' : '',
					'thonlabs tl-font-sans tl-w-full tl-min-h-screen tl-bg-background tl-text-text',
				)}
			>
				{children}
			</div>
		</>
	);
}
