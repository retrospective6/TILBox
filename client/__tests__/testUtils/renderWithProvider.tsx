import React from 'react';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function renderWithProvider(
  component: JSX.Element,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      {component}
    </QueryClientProvider>,
    options,
  );
}
