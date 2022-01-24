import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/utils';
import { PROFILE } from '@mocks/data/users';

export const mockedLogin = rest.post(mockApiURL('/login'), (req, res, ctx) =>
  res(ctx.json({ accessToken: 'Bearer test-access-token' })),
);

export const mockedGetProfile = rest.get(
  mockApiURL('/users/profile'),
  (req, res, ctx) => res(ctx.json({ ...PROFILE })),
);
