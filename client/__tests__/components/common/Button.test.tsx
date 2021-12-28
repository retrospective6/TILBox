import React from 'react';
import { render } from '@testing-library/react';
import Button, { ButtonProps } from '@/components/common/Button';
import { RenderResult } from 'next/dist/server/utils';

const DEFAULT_ARGS: ButtonProps = {
  variant: 'default',
  size: 'small',
  children: 'text',
};

const renderButton = (props: Partial<ButtonProps>): RenderResult => {
  return render(<Button {...DEFAULT_ARGS} {...props} />);
};

describe('with width', () => {
  test.each(['100%', '100px', '100vw'])(`has width style [%s]`, (width) => {
    const { getByText } = renderButton({ width });
    const button = getByText(DEFAULT_ARGS.children);
    expect(button).toHaveStyle({ width });
  });
});
