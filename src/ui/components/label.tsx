'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../core/utils';
import { Skeleton } from './skeleton';

const labelVariants = tv({
	base: `tl-text-sm tl-font-medium tl-leading-none 
     peer-disabled:tl-cursor-not-allowed peer-disabled:tl-opacity-70 
     tl-transition-default`,
	variants: {
		state: {
			default: 'tl-text-zinc-500',
		},
	},
	defaultVariants: {
		state: 'default',
	},
});

type Props = {
	withFocusWithin?: boolean;
	loading?: boolean;
};

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	Props &
		React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants>
>(({ className, state, withFocusWithin = true, loading, ...props }, ref) =>
	!loading ? (
		<LabelPrimitive.Root
			ref={ref}
			className={cn(labelVariants({ state, className }), {
				'group-focus-within:tl-text-zinc-700 dark:group-focus-within:tl-text-zinc-300':
					withFocusWithin,
			})}
			{...props}
		/>
	) : (
		<Skeleton width={'7.5rem'} height={'0.875rem'} />
	),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
