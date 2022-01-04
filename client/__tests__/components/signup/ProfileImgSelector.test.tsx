import { MockImage } from '@mocks/MockComponent';

import React from 'react';
import ProfileImgSelector, {
  ProfileImgSelectorProps,
} from '@/components/signup/ProfileImgSelector';
import { fireEvent, render, RenderResult } from '@testing-library/react';

jest.mock('next/image', () => MockImage);

const DEFAULT_ARGS: ProfileImgSelectorProps = {
  onSubmit: jest.fn(),
};

const renderProfileImgSelector = (
  props: Partial<ProfileImgSelectorProps>,
): RenderResult => {
  return render(<ProfileImgSelector {...DEFAULT_ARGS} {...props} />);
};

describe('with img', () => {
  const img = 'https://avatars.githubusercontent.com/u/45786387?s=40&v=4';

  test('render preview img', () => {
    const { getByAltText } = renderProfileImgSelector({ img });
    const previewImg = getByAltText('profile-img');
    expect(previewImg).toHaveAttribute('src', img);
  });
});

describe('without img', () => {
  test('has no img tag', () => {
    const { getByAltText } = renderProfileImgSelector({});
    expect(() => getByAltText('profile-img')).toThrowError();
  });
});

describe('on change file input', () => {
  const file = new File(['test'], 'test.png', { type: 'image/png' });

  const onSubmit = jest.fn();
  URL.createObjectURL = jest.fn((value) => value.toString());

  test('change img src', async () => {
    const { getByTestId, findByAltText } = renderProfileImgSelector({
      onSubmit,
    });
    const input = getByTestId('image-input');

    fireEvent.change(input, {
      target: { files: [file] },
    });

    const img = await findByAltText('profile-img');
    expect(img).toHaveAttribute('src', file.toString());
  });
});
