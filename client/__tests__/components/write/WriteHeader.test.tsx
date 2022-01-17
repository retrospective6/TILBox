import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import WriteHeader, { WriteHeaderProps } from '@/components/write/WriteHeader';

const DEFAULT_ARGS: WriteHeaderProps = {
  onSubmit: jest.fn(),
};

const renderWriteHeader = (props: Partial<WriteHeaderProps>): RenderResult => {
  return render(<WriteHeader {...DEFAULT_ARGS} {...props} />);
};

describe('onSubmit 메소드', () => {
  const onSubmit = jest.fn();

  test('등록 버튼 클릭 시 실행', () => {
    const { getByTestId } = renderWriteHeader({ onSubmit });
    const submitButton = getByTestId('write-submit');

    fireEvent.click(submitButton);

    expect(onSubmit).toBeCalled();
  });
});
