import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/utils';
import { POST } from '@mocks/data/posts';

export const mockWritePost = rest.post(mockApiURL('/posts'), (req, res, ctx) =>
  res(ctx.json(1)),
);

export const mockGetPost = rest.get(mockApiURL('/posts/:id'), (req, res, ctx) =>
  res(ctx.json({ ...POST, id: req.params.id })),
);
