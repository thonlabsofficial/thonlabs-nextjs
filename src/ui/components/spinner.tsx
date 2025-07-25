import type React from 'react';
import { cn } from '../core/utils';

function Spinner({ className }: React.HTMLAttributes<HTMLElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			className={cn('tl-animate-spin tl-h-5 tl-w-5 tl-text-white', className)}
		>
			<circle
				className="tl-opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			></circle>
			<path
				className="tl-opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	);
}

export { Spinner };
