import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button, { ButtonProps } from '@/components/Button';
import { RenderResult } from 'next/dist/server/utils';

describe('Button', () => {
  const DEFAULT_ARGS: ButtonProps = {
    onClick: jest.fn(),
    text: 'text',
    theme: 'primary',
  };

  const renderButton = (props: Partial<ButtonProps>): RenderResult => {
    return render(<Button {...DEFAULT_ARGS} {...props} />);
  };

  describe('with text', () => {
    const text = 'test';
    test('render text', () => {
      const { getByText } = renderButton({ text });
      getByText(text);
    });
  });

  describe('with onClick method', () => {
    const onClick = jest.fn();
    test('run on click', () => {
      const { getByText } = renderButton({ onClick });
      const button = getByText(DEFAULT_ARGS.text);
      fireEvent.click(button);
      expect(onClick).toBeCalled();
    });
  });

  describe('with width', () => {
    test.each(['100%', '100px', '100vw'])(`has width style [%s]`, (width) => {
      const { getByText } = renderButton({ width });
      const button = getByText(DEFAULT_ARGS.text);
      expect(button).toHaveStyle({ width });
    });
  });
});
