'use client';

import { CheckCircle, CircleAlert, Info } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import { fonts } from '../core/fonts';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { resolvedTheme } = useTheme();
	return (
		<Sonner
			theme="system"
			className={`${fonts.className} thonlabs ${
				resolvedTheme === 'dark' ? 'dark' : ''
			}`}
			toastOptions={{
				classNames: {
					toast: `
            tl-text-foreground 
            tl-border tl-border-border 
            tl-shadow-lg tl-rounded-md 
            tl-px-3 tl-text-sm 
            tl-font-medium tl-text-text
          `,
					default: `tl-bg-card tl-border-foreground/20`,
					success: `!tl-bg-success !tl-border-success/60`,
					error: `!tl-bg-destructive !tl-border-destructive/50`,
					info: `!tl-bg-info !tl-border-info/50`,
					icon: `!tl-text-foreground`,
					title: `tl-text-foreground tl-text-sm tl-font-sans tl-font-semibold`,
					description: `tl-font-sans tl-text-foreground`,
					actionButton: `tl-bg-primary tl-text-primary-foreground`,
					cancelButton: `tl-bg-muted tl-text-muted-foreground`,
					closeButton: `
              !tl-text-foreground
              !tl-bg-transparent
              tl-absolute tl-left-auto tl-right-0 tl-top-3 
              tl-rounded-md tl-p-1 tl-opacity-0
              group-hover:tl-opacity-100 focus:tl-outline-none focus:tl-ring-1 
              tl-border-none tl-bg-transparent
              focus:tl-ring-0
              tl-transition-default
              hover:!tl-bg-foreground/10
              group-data-[type=info]:hover:!tl-bg-foreground/10
              group-data-[type=success]:hover:!tl-bg-foreground/10
              group-data-[type=error]:hover:!tl-bg-foreground/10
            `,
				},
			}}
			icons={{
				success: <CheckCircle className="tl-w-5 tl-h-5" />,
				error: <CircleAlert className="tl-w-5 tl-h-5" />,
				info: <Info className="tl-w-5 tl-h-5" />,
			}}
			{...props}
		/>
	);
};

export { Toaster };
