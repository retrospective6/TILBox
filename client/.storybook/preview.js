import '../src/styles/global.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import * as NextImage from 'next/image';

initialize();
export const decorators = [mswDecorator];

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
