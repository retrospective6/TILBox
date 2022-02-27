import styled from '@emotion/styled';
import { css } from '@emotion/react';
import FONT from '@/styles/font';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const Month = styled.span`
  ${FONT.title1};
`;

export const PostList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 264px);
  justify-content: space-between;
  row-gap: 38px;
`;

interface PostListItemProps {
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

export const PostListItem = styled.div<PostListItemProps>`
  width: min-content;
  ${({ active }) => active || activeCSS};
`;
