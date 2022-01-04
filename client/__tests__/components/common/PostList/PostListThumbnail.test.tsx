import { MockImage } from '@mocks/MockComponent';

import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import PostListThumbnail, {
  PostListThumbnailProps,
} from '@/components/common/PostList/PostListThumbnail';
import { Thumbnail } from '@/types/Post';

jest.mock('next/image', () => MockImage);

const DEFAULT_ARGS: PostListThumbnailProps = {
  title: '제목',
  thumbnail: {
    img: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
  },
};

const renderThumbnail = (
  props: Partial<PostListThumbnailProps>,
): RenderResult => {
  return render(<PostListThumbnail {...DEFAULT_ARGS} {...props} />);
};

describe('with src thumbnail', () => {
  const thumbnail = {
    img: 'https://avatars.githubusercontent.com/u/20358042?s=48&v=4',
  };

  test('render img', () => {
    const { getByRole } = renderThumbnail({ thumbnail });
    const thumbnailImg = getByRole('img');

    expect(thumbnailImg).toHaveAttribute('src', thumbnail.img);
  });
});

describe('without thumbnail img', () => {
  const thumbnail: Thumbnail = {
    gradient: { start: '#000000', end: '#000000' },
  };

  test('do not render img tag', () => {
    const { getByRole } = renderThumbnail({ thumbnail });
    expect(() => getByRole('img')).toThrowError();
  });
});
