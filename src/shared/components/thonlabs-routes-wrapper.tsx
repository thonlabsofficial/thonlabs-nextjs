import { useTheme } from 'next-themes';
import React from 'react';
import { fonts } from '../../ui/core/fonts';
import { cn } from '../../ui/core/utils';
import ToasterObservableWrapper from './toaster-observable-wrapper';

export default function ThonLabsRoutesWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const { resolvedTheme } = useTheme();

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
			<ToasterObservableWrapper />
			<div
				className={cn(
					fonts.className,
					resolvedTheme === 'dark' ? 'dark' : '',
					'thonlabs tl-font-sans tl-w-full tl-min-h-screen tl-bg-background tl-text-text',
				)}
			>
				{children}
			</div>
		</>
	);
}
