import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../core/utils';
import { Typo } from './typo';

const cardVariants = tv({
  base: 'tl-rounded-lg tl-border tl-text-card-foreground tl-shadow tl-transition-all tl-duration-120 tl-ease-in-out',
  variants: {
    variant: {
      default: 'tl-bg-card',
      transparent: 'tl-bg-transparent',
      darker: 'tl-bg-background/40'
    },
    border: {
      solid: 'tl-border-solid',
      dashed: 'tl-border-dashed tl-border-foreground/[0.12]'
    }
  },
  defaultVariants: {
    variant: 'default',
    border: 'solid'
  }
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, variant, border, ...props }, ref) => (
  <div
    ref={ref}
    className={cardVariants({ variant, border, className })}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  { description?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>
>(({ className, description, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('tl-flex tl-flex-col tl-p-6', className)}
    {...props}
  >
    <Typo>{children}</Typo>
    {description && <Typo variant={'muted'}>{description}</Typo>}
  </div>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'tl-font-semibold tl-leading-none tl-tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('tl-text-sm tl-text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('tl-p-6 tl-pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'tl-flex tl-items-center tl-py-4 tl-px-6 tl-border-t',
      className
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants
};
