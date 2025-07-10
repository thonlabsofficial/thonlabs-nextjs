'use client';

import React from 'react';
import { Toaster } from '../../../ui/components/toaster';
import ToasterObservable from './toaster-observable';

export default function ToasterObservableWrapper() {
	return (
		<React.Suspense>
			<ToasterObservable />
			<Toaster />
		</React.Suspense>
	);
}
