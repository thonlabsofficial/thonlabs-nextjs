import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../core/utils';
import { Button } from './button';
import { Label } from './label';
import { Skeleton } from './skeleton';
import { Spinner } from './spinner';
import { Typo } from './typo';

const inputVariants = tv({
	base: `
      tl-flex tl-text-text tl-w-full tl-rounded-md tl-border tl-border-solid hover:tl-bg-input-hover tl-shadow-sm 
      placeholder:tl-text-muted-foreground
      tl-transition tl-duration-200 tl-ease-in-out
      file:tl-border-0 file:tl-text-sm file:tl-font-medium tl-outline-none
      disabled:tl-opacity-50 disabled:tl-pointer-events-none
    `,
	variants: {
		state: {
			default: `
        tl-border-foreground/20
        hover:tl-border-foreground/40
        focus:tl-border-foreground/60
        read-only:tl-bg-accent
        hover:read-only:tl-border
        focus:read-only:tl-border
				tl-bg-background
      `,
			error: 'tl-border-red-500 focus:tl-border-red-500 tl-bg-background',
		},
		size: {
			xs: 'tl-px-1.5 tl-py-0.5 tl-text-xs tl-h-7',
			sm: 'tl-px-2.5 tl-py-1 tl-text-sm tl-h-9',
			md: 'tl-px-3 tl-py-1.5 tl-text-base tl-h-11',
			lg: 'tl-px-4 tl-py-2 tl-text-base tl-h-14',
		},
	},
	defaultVariants: {
		state: 'default',
		size: 'md',
	},
});

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	label?: React.ReactNode;
	error?: React.ReactNode;
	loading?: boolean;
	loadingInternal?: 'show-hide';
	withCopy?: boolean;
	withHide?: boolean;
	hidePlaceholder?: string;
	onHiddenClick?: () => void;
}

const loadingSizeMapper = {
	xs: '1.75rem',
	sm: '2.25rem',
	md: '3rem',
	lg: '3.5rem',
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			size,
			label,
			error,
			state,
			loading,
			withCopy,
			withHide,
			hidePlaceholder = '••••••••••••••••••••••••',
			onHiddenClick,
			...props
		},
		ref,
	) => {
		const [hidden, setHidden] = React.useState(withHide);
		const [buttonTriggered, setButtonTriggered] = React.useState(0);
		const [buttonsWidth, setButtonsWidth] = React.useState(0);
		const buttonsRef = React.useRef<HTMLDivElement>(null);
		const [loadingFromButtons, setLoadingFromButtons] = React.useState<
			'show-hide' | null
		>(null);

		React.useEffect(() => {
			if (buttonsRef.current) {
				const { width } = buttonsRef.current?.getBoundingClientRect() || {};
				setButtonsWidth((width + 10) / 16 || 0);
			}
		}, [buttonTriggered]);

		return (
			<>
				{label && (
					<>
						{' '}
						{!loading ? (
							<Label htmlFor={props.id} withFocusWithin={!props.readOnly}>
								{label}
							</Label>
						) : (
							<Skeleton width={'7.5rem'} height={'0.875rem'} />
						)}
					</>
				)}
				{!loading ? (
					<div className="tl-w-full tl-relative">
						<input
							id={props.name}
							type={type}
							className={inputVariants({
								size,
								state: error ? 'error' : state,
								className,
							})}
							style={{ paddingRight: `${buttonsWidth}rem` }}
							ref={ref}
							{...props}
							value={hidden ? hidePlaceholder : props.value}
						/>
						{(withCopy || withHide) && (
							<div
								ref={buttonsRef}
								className="tl-inline-flex tl-gap-1 tl-absolute tl-top-1.5 tl-right-1.5 tl-h-[calc(100%-0.75rem)]"
							>
								{withHide && (
									<Button
										className={cn('tl-inline-flex', {
											'tl-pointer-events-none':
												loadingFromButtons === 'show-hide',
										})}
										size="xs"
										variant="secondary"
										type="button"
										onClick={async () => {
											if (onHiddenClick) {
												setLoadingFromButtons('show-hide');
												await onHiddenClick();
												setLoadingFromButtons(null);
											}

											setHidden(!hidden);
											setButtonTriggered(Math.random());
										}}
									>
										{loadingFromButtons === 'show-hide' ? (
											<Spinner />
										) : hidden ? (
											'Show'
										) : (
											'Hide'
										)}
									</Button>
								)}
							</div>
						)}
					</div>
				) : (
					<Skeleton
						width={'100%'}
						height={loadingSizeMapper[size || 'md']}
						className="!tl-rounded-md"
					/>
				)}
				{error && (
					<Typo variant={size} state={'error'} className="tl-text-sm">
						{error}
					</Typo>
				)}
			</>
		);
	},
);
Input.displayName = 'Input';

function InputWrapper({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<div
			{...props}
			className={cn('tl-flex tl-flex-col tl-gap-1 tl-group', className)}
		>
			{children}
		</div>
	);
}

export { Input, InputWrapper, inputVariants };
