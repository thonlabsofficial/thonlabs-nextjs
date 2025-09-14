import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const typoVariants = tv({
  base: 'tl-font-sans',
  variants: {
    variant: {
      default: 'tl-text-base tl-text-text tl-font-normal tl-leading-relaxed',
      paragraph: 'tl-leading-relaxed tl-[&:not(:first-child)]:mt-5 tl-mb-0',
      h1: 'tl-scroll-m-20 tl-text-4xl tl-font-bold tl-tracking-tight tl-lg:tl-text-5xl',
      h2: 'tl-scroll-m-20 tl-text-3xl tl-font-semibold tl-tracking-tight tl-first:tl-mt-0',
      h3: 'tl-scroll-m-20 tl-text-2xl tl-font-semibold tl-tracking-tight',
      h4: 'tl-scroll-m-20 tl-text-xl tl-font-medium tl-tracking-tight',
      blockquote: 'tl-mt-6 tl-border-l-2 tl-pl-6 tl-italic',
      inlineCode:
        'tl-relative tl-rounded tl-bg-muted tl-px-[0.3rem] tl-py-[0.2rem] tl-font-mono tl-text-sm tl-font-semibold',
      lead: 'tl-text-lg tl-text-muted-foreground',
      lg: 'tl-text-lg tl-font-semibold',
      md: 'tl-text-lg tl-font-medium',
      sm: 'tl-text-sm tl-font-medium',
      xs: 'tl-text-xs tl-font-medium',
      muted: 'tl-text-sm tl-text-muted-foreground',
      mutedXs: 'tl-text-xs tl-text-muted-foreground',
      code: 'tl-font-code tl-p-0.5 tl-bg-blue-500/[0.2] tl-rounded-sm tl-text-sm',
      codeLink:
        'tl-font-code tl-py-0.5 tl-px-1 tl-bg-blue-500/[0.2] tl-hover:tl-bg-blue-500/[0.3] tl-rounded-sm tl-text-sm tl-transition-default',
      link: 'tl-underline tl-underline-offset-4 tl-cursor-pointer',
      underline: 'tl-underline tl-underline-offset-4'
    },
    state: {
      default: '',
      error: '!tl-text-red-500'
    }
  },
  defaultVariants: {
    variant: 'default',
    state: 'default'
  }
});

export interface TypoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typoVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  fallback?: React.ReactNode;
}

function Typo({
  className,
  variant,
  state,
  as = 'span',
  fallback = '-',
  ...props
}: TypoProps) {
  return React.createElement(as, {
    ...props,
    children: props.children || fallback,
    className: typoVariants({ variant, state, className })
  });
}

export { Typo, typoVariants };
