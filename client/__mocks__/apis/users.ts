import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/utils';
import { PROFILE, USER } from '@mocks/data/users';

export const mockedSignup = rest.post(mockApiURL('/signup'), (req, res, ctx) =>
  res(ctx.status(200)),
);

export const mockedLogin = rest.post(mockApiURL('/login'), (req, res, ctx) =>
  res(ctx.json({ accessToken: 'Bearer test-access-token' })),
);

export const mockedGetProfile = rest.get(
  mockApiURL('/users/profile'),
  (req, res, ctx) => res(ctx.json({ ...PROFILE })),
);

export const mockedGetUser = rest.get(mockApiURL('/users'), (req, res, ctx) =>
  res(ctx.json({ ...USER })),
);

export const mockedUpdateUser = rest.put(
  mockApiURL('/users'),
  (req, res, ctx) => res(ctx.json(req.body)),
);

export const mockedSignOut = rest.delete(
  mockApiURL('/users'),
  (req, res, ctx) => res(ctx.status(200)),
);
