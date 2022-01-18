import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'third'
  | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ContainerProps {
  variant: ButtonVariant;
  size: ButtonSize;
  bold: boolean;
  width?: string;
}

export const Container = styled.button<ContainerProps>`
  padding: 8px 16px;
  height: min-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 24px;

  ${({ variant }) => variantCSS[variant]};
  ${({ size }) => sizeCSS[size]};
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `};
  width: ${({ width }) => (width ? width : 'auto')};
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
