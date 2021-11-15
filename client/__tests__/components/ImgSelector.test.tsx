import React from 'react';
import ImgSelector, { ImgSelectorProps } from '@/components/ImgSelector';
import { render, RenderResult } from '@testing-library/react';

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

//TODO: 이미지 파일 선택 시 이미지 변경되는지 테스트하기
