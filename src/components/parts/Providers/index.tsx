'use client';
import React, { useState } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { queryClientConfig } from '../../../lib/queryClient';

import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';

const ReactQueryDevtoolsProduction = dynamic(() =>
  import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools)
);

function Providers({ children }: any) {
  const [showDevtools, setShowdevtools] = useState(false);
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}

        <ReactQueryDevtools initialIsOpen />
        {showDevtools && (
          <React.Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </React.Suspense>
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default Providers;
