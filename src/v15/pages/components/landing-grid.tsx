import {cn} from "../../../ui/core/utils";
import styles from "../../../shared/styles/landing-grid.module.scss";

export default function LandingGrid() {
  return (
    <div
      className={cn(
        `
          absolute inset-0 z-[0] -left-px opacity-60 
          [mask-image:linear-gradient(transparent_1%,white,transparent_43%)]
        `,
        styles.landingGrid
      )}
    ></div>
  );
}
