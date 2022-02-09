import '../src/styles/global.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { mockApis } from '../__mocks__/apis';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import * as NextImage from 'next/image';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SWRConfig } from 'swr';
import { ModalProvider } from '../src/hooks/useModal';
import { cookieDecorator } from '../__mocks__/cookie';

initialize();

export const decorators = [
  mswDecorator,
  cookieDecorator,
  (Story) => (
    <QueryClientProvider client={new QueryClient()}>
      <ModalProvider>
        <SWRConfig
          value={{
            dedupingInterval: 0,
            errorRetryCount: 0,
            provider: () => new Map(),
          }}
        >
          <Story />
        </SWRConfig>
      </ModalProvider>
    </QueryClientProvider>
  ),
];

export const parameters = {
  msw: mockApis,
  actions: { argTypesRegex: '^on.*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
