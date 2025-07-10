import { cn } from '../../../ui/core/utils';

export default function LandingGrid() {
	return (
		<div
			className={cn(
				` landing-grid
          tl-absolute tl-inset-0 tl-z-[0] tl-left-[-1px] tl-opacity-60 
          [mask-image:linear-gradient(transparent_1%,white,transparent_43%)]
        `,
			)}
		></div>
	);
}
