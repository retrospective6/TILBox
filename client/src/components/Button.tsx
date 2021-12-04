import React, { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'third' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  width?: string;
}

export default function Button({
  variant = 'default',
  width,
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <Container variant={variant} width={width} {...props}>
      {children}
    </Container>
  );
}

interface ContainerProps {
  variant: ButtonVariant;
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
