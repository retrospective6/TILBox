import React from 'react';
import styled from '@emotion/styled';
import css, { SerializedStyles } from '@emotion/css';

type ButtonTheme = 'primary' | 'secondary' | 'danger';

export interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  text: string;
  theme: ButtonTheme;
  width?: string;
}

export default function Button(props: ButtonProps): JSX.Element {
  const { onClick, text, theme, width } = props;
  return (
    <Container onClick={onClick} selected={theme} width={width}>
      {text}
    </Container>
  );
}

interface ContainerProps {
  selected: ButtonTheme;
  width?: string;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};

  border: none;
  border-radius: 24px;

  color: white;

  ${({ selected }) => buttonThemes[selected]}

  &:hover {
    cursor: pointer;
  }
`;

const buttonThemes: { [keys in ButtonTheme]: SerializedStyles } = {
  primary: css`
    background: #0068d4;
  `,
  secondary: css`
    background: #646464;
  `,
  danger: css`
    background: #c90909;
  `,
};
