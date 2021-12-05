import React, { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'third' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size: ButtonSize;
  width?: string;
}

export default function Button({
  variant = 'default',
  size = 'small',
  width,
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <Container variant={variant} size={size} width={width} {...props}>
      {children}
    </Container>
  );
}

interface ContainerProps {
  variant: ButtonVariant;
  size: ButtonSize;
  width?: string;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 24px;
  font-weight: 700;
  
  width: ${({ width }) => (width ? width : 'auto')}};

  ${({ variant }) => variantCSS[variant]};
  ${({ size }) => sizeCSS[size]};
`;

const variantCSS: { [keys in ButtonVariant]: SerializedStyles } = {
  default: css`
    background: transparent;
    border: 1px solid #000000;
  `,
  primary: css`
    background: #0068d4;
    color: #ffffff;
    border: none;
  `,
  secondary: css`
    background: #000000;
    color: #ffffff;
    border: none;
  `,
  third: css`
    background: #646464;
    color: #ffffff;
    border: none;
  `,
  danger: css`
    background: #c90909;
    color: #ffffff;
    border: none;
  `,
};

const sizeCSS: { [keys in ButtonSize]: SerializedStyles } = {
  small: css`
    font-size: 12px;
    line-height: 14px;
  `,
  medium: css`
    font-size: 16px;
    line-height: 19px;
  `,
  large: css`
    font-size: 18px;
    line-height: 22px;
  `,
};
