import { MockImage } from '@mocks/MockComponent';

import React from 'react';
import ImgSelector, { ImgSelectorProps } from '@/components/common/ImgSelector';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import waitForExpect from 'wait-for-expect';

import { IMG_SRC } from '@mocks/MockData';

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

  test('run onSubmit method with converted file', async () => {
    const { getByTestId } = renderImgSelector({ onSubmit });
    const input = getByTestId('image-input');

    fireEvent.change(input, {
      target: { files: [file] },
    });

    await waitForExpect(() => {
      expect(onSubmit).toBeCalledWith(IMG_SRC);
    });
  });
});
