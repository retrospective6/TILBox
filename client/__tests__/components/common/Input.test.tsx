import React from 'react';
import { RenderResult } from 'next/dist/server/utils';
import Input, { InputProps } from '@/components/common/Input';
import { render } from '@testing-library/react';

const DEFAULT_ARGS: InputProps = {
  title: 'My TIL 주소',
  placeholder: 'www.tilbox/til356list',
  hint: '숫자, 영어를 조합해 나만의 TIL 주소를 만들 수 있습니다.',
  rules: [
    {
      rule: (value: string) => value === '',
      message: '필수적으로 입력해야 합니다.',
    },
  ],
};

const renderInput = (props: Partial<InputProps>): RenderResult => {
  return render(<Input {...DEFAULT_ARGS} {...props} />);
};

describe('props Test', () => {
  test('title을 props로 넘기면 title이 랜더된다.', () => {
    const title = '이메일';
    const { getByText } = renderInput({ title });
    getByText(title);
  });

  test('placeholder을 props로 넘기면 placeholder이 랜더된다.', () => {
    const placeholder = 'kakao@kakao.com';
    const { getByPlaceholderText } = renderInput({ placeholder });
    getByPlaceholderText(placeholder);
  });

  test('hint을 props로 넘기면 hint이 랜더된다.', () => {
    const hint = '2자 이상 8자 이하로 입력해주세요.';
    const { getByText } = renderInput({ hint });
    getByText(hint);
  });

  describe('width을 props로 넘기면 width으로 랜더된다.', () => {
    test.each(['100%', '100px', '100vw'])(`has width style [%s]`, (width) => {
      const { getByPlaceholderText } = renderInput({ width });
      const input = getByPlaceholderText(DEFAULT_ARGS.placeholder);
      expect(input).toHaveStyle({ width });
    });
  });

  describe('height을 props로 넘기면 height으로 랜더된다.', () => {
    test.each(['100%', '100px', '100vw'])(`has height style [%s]`, (height) => {
      const { getByPlaceholderText } = renderInput({ height });
      const input = getByPlaceholderText(DEFAULT_ARGS.placeholder);
      expect(input).toHaveStyle({ height });
    });
  });
});
