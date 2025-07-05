import { cn } from '../../../ui/core/utils';
import styles from '../../../shared/styles/landing-grid.module.css';

export default function LandingGrid() {
  return (
    <div
      className={cn(
        `
          tl-absolute tl-inset-0 tl-z-[-1] tl-left-[-1px] tl-opacity-60 
          [mask-image:linear-gradient(transparent_1%,white,transparent_43%)]
        `,
        styles.landingGrid
      )}
    ></div>
  );
}
