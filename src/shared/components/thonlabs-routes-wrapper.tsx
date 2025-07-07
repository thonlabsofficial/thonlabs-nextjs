import { cn } from '../../ui/core/utils';
import { fonts } from '../../ui/core/fonts';
import { useTheme } from 'next-themes';
import ToasterObservableWrapper from './toaster-observable-wrapper';

export default function ThonLabsRoutesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <ToasterObservableWrapper />
      <div
        className={cn(
          fonts.className,
          resolvedTheme === 'dark' ? 'dark' : '',
          'thonlabs tl-font-sans tl-w-full tl-min-h-screen tl-bg-background tl-text-text'
        )}
      >
        {children}
      </div>
    </>
  );
}
