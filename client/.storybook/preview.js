import '../src/styles/global.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { mockApis } from '../__mocks__/apis';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import * as NextImage from 'next/image';

initialize();
export const decorators = [mswDecorator];

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
