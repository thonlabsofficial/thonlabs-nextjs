'use client';

import type React from 'react';
import { SWRConfig } from 'swr';

export function ThonLabsInternalProvider({
	children,
}: React.HTMLAttributes<HTMLElement>) {
	return <SWRConfig>{children}</SWRConfig>;
}
