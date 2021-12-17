import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface ContainerProps {
  zigzag: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 264px);
  column-gap: 16px;

  ${({ zigzag }) =>
    zigzag
      ? css`
          .post-list-item:nth-child(2n + 1) {
            margin-bottom: 64px;
          }
          .post-list-item:nth-child(2n) {
            margin-top: 62px;
          }
        `
      : css`
          row-gap: 38px;
        `}
`;
