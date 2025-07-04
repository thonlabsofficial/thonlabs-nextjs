"use client";

import {CheckCircle, CircleAlert, Info} from "lucide-react";
import {Toaster as Sonner} from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({...props}: ToasterProps) => {
  return (
    <Sonner
      theme="system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            tl-group toast group-[.toaster]:tl-text-foreground 
            group-[.toaster]:tl-border group-[.toaster]:tl-border-border 
            group-[.toaster]:tl-shadow-lg group-[.toaster]:tl-rounded-md 
            group-[.toaster]:tl-px-3 group-[.toaster]:tl-text-sm 
            group-[.toaster]:tl-font-medium group-[.toaster]:tl-text-text
          `,
          default: `group-[.toaster]:tl-bg-card group-[.toaster]:tl-border-foreground/20`,
          success: `group-[.toaster]:!tl-bg-success group-[.toaster]:!tl-border-success/60`,
          error: `group-[.toaster]:!tl-bg-destructive group-[.toaster]:!tl-border-destructive/50`,
          info: `group-[.toaster]:!tl-bg-info group-[.toaster]:!tl-border-info/50`,
          icon: `group-[.toaster]:!tl-text-foreground`,
          title: `group-[.toast]:tl-text-foreground group-[.toast]:tl-text-sm group-[.toast]:tl-font-sans group-[.toast]:tl-font-semibold`,
          description: `group-[.toast]:tl-font-sans group-[.toast]:tl-text-foreground`,
          actionButton: `group-[.toast]:tl-bg-primary group-[.toast]:tl-text-primary-foreground`,
          cancelButton: `group-[.toast]:tl-bg-muted group-[.toast]:tl-text-muted-foreground`,
          closeButton: `
              group-[.toast]:!tl-text-foreground
              group-[.toast]:!tl-bg-transparent
              group-[.toast]:tl-absolute group-[.toast]:tl-left-auto group-[.toast]:tl-right-0 group-[.toast]:tl-top-3 
              group-[.toast]:tl-rounded-md group-[.toast]:tl-p-1 group-[.toast]:tl-opacity-0
              group-[.toast]:group-hover:tl-opacity-100 group-[.toast]:focus:tl-outline-none group-[.toast]:focus:tl-ring-1 
              group-[.toast]:tl-border-none group-[.toast]:tl-bg-transparent
              group-[.toast]:focus:tl-ring-0
              group-[.toast]:tl-transition-default
              group-[.toast]:hover:!tl-bg-foreground/10
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

export {Toaster};
