import { rest } from 'msw';

export const mockedLogin = rest.post('/', (req, res, ctx) =>
  res(ctx.json({ token: 'Bearer test-access-token' })),
);
