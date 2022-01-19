import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/index';

export const mockedLogin = rest.post(mockApiURL('/login'), (req, res, ctx) =>
  res(ctx.json({ token: 'Bearer test-access-token' })),
);