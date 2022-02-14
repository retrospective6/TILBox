import { rest } from 'msw';
import { mockApiURL } from '@mocks/apis/utils';
import { IMG_SRC } from '@mocks/data';

export const mockedUpload = rest.post(
  mockApiURL('/images/upload'),
  (req, res, ctx) =>
    res(
      ctx.json({
        url: IMG_SRC,
      }),
    ),
);
