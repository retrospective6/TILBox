import { MockImage } from '@mocks/MockComponent';

import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import PostListThumbnail, {
  PostListThumbnailProps,
} from '@/components/PostList/PostListThumbnail';

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

describe('with title length <= 20', () => {
  test.each([
    '여덟글자이하에용',
    '이건열두글자문장입니다요',
    '이건스무글자짜리문장입니다안녕하십니까요',
  ])('render title ', (title) => {
    const { getByText } = renderThumbnail({ title });
    getByText(title);
  });
});

describe('with title length > 20', () => {
  test.each([
    '이건스물한글자짜리문장이에요겁나게길구만유',
    '이건조금더길게적은문장입니다전체길이는스물일곱글자네요',
  ])('render title only 20 length and add ... ', (title) => {
    const { getByText } = renderThumbnail({ title });
    getByText(title.substring(0, 20) + '...');
  });
});
