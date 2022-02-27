import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/utils';
import { POST, POSTS } from '@mocks/data/posts';

export const mockWritePost = rest.post(mockApiURL('/posts'), (req, res, ctx) =>
  res(ctx.json(1)),
);

export const mockGetPost = rest.get(mockApiURL('/posts/:id'), (req, res, ctx) =>
  res(ctx.json({ ...POST, id: req.params.id })),
);

export const mockGetPosts = rest.get(mockApiURL('/posts'), (req, res, ctx) =>
  res(ctx.json(POSTS)),
);

export const mockGetMyPosts = rest.get(
  mockApiURL('/me/posts'),
  (req, res, ctx) => res(ctx.json(POSTS)),
);
