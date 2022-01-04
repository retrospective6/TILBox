import { MockImage } from '@mocks/MockComponent';

import React from 'react';
import ImgSelector, { ImgSelectorProps } from '@/components/common/ImgSelector';
import { fireEvent, render, RenderResult } from '@testing-library/react';

jest.mock('next/image', () => MockImage);

const DEFAULT_ARGS: ImgSelectorProps = {
  onSubmit: jest.fn(),
};

const renderImgSelector = (props: Partial<ImgSelectorProps>): RenderResult => {
  return render(<ImgSelector {...DEFAULT_ARGS} {...props} />);
};

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
});
