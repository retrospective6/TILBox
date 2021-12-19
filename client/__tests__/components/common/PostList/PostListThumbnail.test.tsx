import { MockImage } from '@mocks/MockComponent';

import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import PostListThumbnail, {
  PostListThumbnailProps,
} from '@/components/common/PostList/PostListThumbnail';

jest.mock('next/image', () => MockImage);

const DEFAULT_ARGS: PostListThumbnailProps = {
  title: '제목',
  thumbnail: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
};

const renderThumbnail = (
  props: Partial<PostListThumbnailProps>,
): RenderResult => {
  return render(<PostListThumbnail {...DEFAULT_ARGS} {...props} />);
};

describe('with src thumbnail', () => {
  const src = 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4';

  test('render img', () => {
    const { getByRole } = renderThumbnail({ thumbnail: src });
    const thumbnailImg = getByRole('img');

    expect(thumbnailImg).toHaveAttribute('src', src);
  });
});

describe('without thumbnail img', () => {
  const thumbnail = 'hi';

  test('do not render img tag', () => {
    const { getByRole } = renderThumbnail({ thumbnail });
    expect(() => getByRole('img')).toThrowError();
  });
});
