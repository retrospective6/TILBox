import React from 'react';
import { RenderResult } from 'next/dist/server/utils';
import TextInput, { TextInputProps } from '@/components/common/TextInput';
import { render } from '@testing-library/react';

const DEFAULT_ARGS: TextInputProps = {
  title: 'My TIL 주소',
  placeholder: 'www.tilbox/til356list',
};

const renderInput = (props: Partial<TextInputProps>): RenderResult => {
  return render(<TextInput {...DEFAULT_ARGS} {...props} />);
};

describe('props Test', () => {
  test('title을 props로 넘기면 title이 랜더된다.', () => {
    const title = '이메일';
    const { getByText } = renderInput({ title });
    getByText(title);
  });

  describe('width을 props로 넘기면 width으로 랜더된다.', () => {
    test.each(['100%', '100px', '100vw'])(`has width style [%s]`, (width) => {
      const { getByTestId } = renderInput({ width });
      const input = getByTestId('text-input');
      expect(input).toHaveStyle({ width });
    });
  });

  describe('height을 props로 넘기면 height으로 랜더된다.', () => {
    test.each(['100%', '100px', '100vw'])(`has height style [%s]`, (height) => {
      const { getByTestId } = renderInput({ height });
      const input = getByTestId('text-input');
      expect(input).toHaveStyle({ height });
    });
  });
});
