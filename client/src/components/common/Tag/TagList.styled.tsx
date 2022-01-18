import styled from '@emotion/styled';
import FONT from '@/styles/font';

export const TagList = styled.ul`
  display: flex;
  margin: 15px 0;
  overflow-x: hidden;
  ${FONT.caption2};
  li {
    margin-right: 4px;
  }
`;

export const TagListItem = styled.li`
  padding: 1px 8px 2px;
  height: 19px;
  background: #f3f3f3;
  border-radius: 8px;
  color: #666666;
  text-align: center;
`;
