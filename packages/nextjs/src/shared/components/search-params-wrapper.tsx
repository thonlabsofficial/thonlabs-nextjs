'use client';

import React from 'react';
import SearchParamsObservable from './search-params-observable';

export default function SearchParamsWrapper() {
	return (
		<React.Suspense>
			<SearchParamsObservable />
		</React.Suspense>
	);
}
