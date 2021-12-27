import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ContainerProps {
  active: boolean;
}

const activeCSS = css`
  background: white;
  opacity: 0.4;
  box-shadow: 4px 6px 16px rgba(174, 174, 174, 0.25);
  border-radius: 0 0 16px 16px;
  div {
    box-shadow: none;
  }
`;

export const Container = styled.div<ContainerProps>`
  width: min-content;
  ${({ active }) => active || activeCSS};
`;
