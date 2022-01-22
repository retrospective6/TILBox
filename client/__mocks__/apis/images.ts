import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/utils';

export const mockedUpload = rest.post(
  mockApiURL('/images/upload'),
  (req, res, ctx) =>
    res(ctx.json('https://avatars.githubusercontent.com/u/20358042?s=48&v=4')),
);
