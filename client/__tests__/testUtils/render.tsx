import React from 'react';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import { SWRConfig } from 'swr';

export default function renderWithProvider(
  component: JSX.Element,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult {
  return render(
    <SWRConfig
      value={{
        dedupingInterval: 0,
        errorRetryCount: 0,
        provider: () => new Map(),
      }}
    >
      {component}
    </SWRConfig>,
    options,
  );
}
