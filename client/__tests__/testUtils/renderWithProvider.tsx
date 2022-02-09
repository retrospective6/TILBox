import React from 'react';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function renderWithProvider(
  component: JSX.Element,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <SWRConfig
        value={{
          dedupingInterval: 0,
          errorRetryCount: 0,
          provider: () => new Map(),
        }}
      >
        {component}
      </SWRConfig>
    </QueryClientProvider>,
    options,
  );
}
