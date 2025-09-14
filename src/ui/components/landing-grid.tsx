import * as motion from 'framer-motion/client';
import { cn } from '../core/utils';

export default function LandingGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        `
          tl-absolute tl-inset-0 tl-z-[-1] tl-left-[-1px] 
          [mask-image:linear-gradient(transparent_1%,white,transparent_43%)]
        `
      )}
      style={{
        backgroundImage: `linear-gradient(
          to right,
          hsl(var(--muted)) 1px,
          transparent 1px
        ),
        linear-gradient(to bottom, hsl(var(--muted)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }}
    ></motion.div>
  );
}
