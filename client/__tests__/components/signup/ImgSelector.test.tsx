import { MockImage } from '@mocks/MockComponent';

import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import ImgSelector, { ImgSelectorProps } from '@/components/signUp/ImgSelector';

jest.mock('next/image', () => MockImage);

const DEFAULT_ARGS: ImgSelectorProps = {
  onSubmit: jest.fn(),
};

const renderImgSelector = (props: Partial<ImgSelectorProps>): RenderResult => {
  return render(<ImgSelector {...DEFAULT_ARGS} {...props} />);
};

describe('with img', () => {
  const img = 'https://avatars.githubusercontent.com/u/45786387?s=40&v=4';

  test('render preview img', () => {
    const { getByRole } = renderImgSelector({ img });
    const previewImg = getByRole('img');
    expect(previewImg).toHaveAttribute('src', img);
  });
});

describe('without img', () => {
  test('has no img tag', () => {
    const { getByRole } = renderImgSelector({});
    expect(() => getByRole('img')).toThrowError();
  });
});

describe('on change file input', () => {
  const file = new File(['test'], 'test.png', { type: 'image/png' });

  const onSubmit = jest.fn();

  const mockedFileConverter = jest.fn((value) => value.toString());
  URL.createObjectURL = mockedFileConverter;

  test('run file converter', () => {
    const { getByTestId } = renderImgSelector({ onSubmit });
    const input = getByTestId('image-input');

    fireEvent.change(input, {
      target: { files: [file] },
    });
    expect(mockedFileConverter).toBeCalledWith(file);
  });

  test('run onSubmit method with converted file', () => {
    const { getByTestId } = renderImgSelector({ onSubmit });
    const input = getByTestId('image-input');

    fireEvent.change(input, {
      target: { files: [file] },
    });
    expect(onSubmit).toBeCalledWith(file.toString());
  });

  test('change img src', () => {
    const { getByTestId, getByRole } = renderImgSelector({ onSubmit });
    const input = getByTestId('image-input');

    fireEvent.change(input, {
      target: { files: [file] },
    });

    const img = getByRole('img');
    expect(img).toHaveAttribute('src', file.toString());
  });
});
