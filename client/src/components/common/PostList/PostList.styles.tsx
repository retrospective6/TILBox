import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';

export type ViewType = 'default' | 'zigzag';

export interface ContainerProps {
  type: ViewType;
}

const typeCSS: { [keys in ViewType]: SerializedStyles } = {
  default: css`
    row-gap: 38px;
  `,
  zigzag: css`
    .post-list-item:nth-child(2n + 1) {
      margin-bottom: 64px;
    }
    .post-list-item:nth-child(2n) {
      margin-top: 62px;
    }
  `,
};

export const Container = styled.div<ContainerProps>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 264px);
  column-gap: 16px;
  justify-content: center;

  ${({ type }) => typeCSS[type]}
`;
