import { MockImage } from '@mocks/MockComponent';

import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import PostListThumbnail, {
  PostListThumbnailProps,
} from '@/components/common/PostList/PostListThumbnail';
import { Thumbnail } from '@/types/Post';
import { IMG_SRC } from '@mocks/data';

jest.mock('next/image', () => MockImage);

const DEFAULT_ARGS: PostListThumbnailProps = {
  title: '제목',
  thumbnail: {
    type: 'image',
    value: IMG_SRC,
  },
};

const renderThumbnail = (
  props: Partial<PostListThumbnailProps>,
): RenderResult => {
  return render(<PostListThumbnail {...DEFAULT_ARGS} {...props} />);
};

describe('with src thumbnail', () => {
  const thumbnail: Thumbnail = {
    type: 'image',
    value: IMG_SRC,
  };

  test('render img', () => {
    const { getByRole } = renderThumbnail({ thumbnail });
    const thumbnailImg = getByRole('img');

    expect(thumbnailImg).toHaveAttribute('src', thumbnail.value);
  });
});

describe('without thumbnail img', () => {
  const thumbnail: Thumbnail = {
    type: 'gradation',
    value: { start: '#000000', end: '#000000' },
  };

  test('do not render img tag', () => {
    const { getByRole } = renderThumbnail({ thumbnail });
    expect(() => getByRole('img')).toThrowError();
  });
});
