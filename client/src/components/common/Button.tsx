import React, { ButtonHTMLAttributes } from 'react';
import * as Styled from './Button.styles';
import { ButtonSize, ButtonVariant } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  bold?: boolean;
  width?: string;
}

export default function Button(props: ButtonProps): JSX.Element {
  const {
    variant = 'default',
    size = 'small',
    bold = false,
    width,
    children,
  } = props;

  return (
    <Styled.Container
      variant={variant}
      size={size}
      bold={bold}
      width={width}
      {...props}
    >
      {children}
    </Styled.Container>
  );
}
