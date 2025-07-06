import * as React from 'react';
import { cn } from '../core/utils';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: `
    tl-inline-flex tl-items-center tl-justify-center tl-whitespace-nowrap tl-rounded-md tl-font-semibold 
    tl-transition-default focus-visible:tl-outline-none focus-visible:tl-ring-1 focus-visible:tl-ring-ring 
    disabled:tl-pointer-events-none disabled:tl-opacity-50 tl-select-none
  `,
  variants: {
    variant: {
      primary:
        'tl-bg-primary tl-text-primary-foreground tl-shadow hover:tl-brightness-90',
      opposite:
        'tl-bg-foreground tl-text-secondary tl-shadow hover:tl-bg-foreground/90',
      destructive:
        'tl-bg-destructive tl-text-destructive-foreground tl-shadow-sm hover:tl-bg-destructive/90',
      outline: `tl-border tl-text-foreground tl-bg-popover tl-border-foreground/20 
           hover:tl-bg-card hover:tl-text-accent-foreground group-hover:tl-bg-card group-hover:tl-text-accent-foreground`,
      secondary:
        'tl-bg-secondary tl-text-secondary-foreground tl-shadow-sm hover:tl-bg-secondary/80',
      ghost:
        'tl-text-text hover:tl-bg-foreground/10 hover:tl-text-accent-foreground',
      link: 'tl-text-primary tl-underline-offset-4 hover:tl-underline',
      linkGhost:
        'tl-text-accent-foreground/70 hover:tl-bg-accent hover:tl-text-foreground',
      success: 'tl-bg-success tl-shadow-sm hover:tl-bg-success/90',
      info: 'tl-bg-info tl-shadow-sm hover:tl-bg-info/90',
    },
    size: {
      xs: 'tl-py-1 tl-px-2 tl-text-xs tl-gap-1',
      sm: 'tl-py-1.5 tl-px-2 tl-text-sm tl-gap-1',
      md: 'tl-px-3 tl-py-2 tl-text-base tl-gap-1.5',
      lg: 'tl-py-4 tl-px-6 tl-text-lg tl-gap-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const buttonIconVariants = tv({
  variants: {
    iconSize: {
      xs: 'tl-w-3 tl-h-3',
      sm: 'tl-w-3.5 tl-h-3.5',
      md: 'tl-w-4 tl-h-4',
      lg: 'tl-w-5 tl-h-5',
    },
  },
  defaultVariants: {
    iconSize: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: any;
  active?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading,
      disabled,
      children,
      icon: Icon,
      active,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), {
          'tl-pointer-events-none tl-opacity-50': loading || disabled,
          'tl-bg-foreground/10': active,
        })}
        ref={ref}
        {...props}
      >
        {Icon && (
          <Icon
            className={cn(buttonIconVariants({ iconSize: size }), {
              'tl-fill-foreground': variant === 'outline',
              'tl-fill-white': variant !== 'primary',
            })}
          />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants, buttonIconVariants };
