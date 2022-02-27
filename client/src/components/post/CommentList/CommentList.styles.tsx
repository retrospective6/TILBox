import styled from '@emotion/styled';
import FONT from '@/styles/font';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentsCount = styled.div`
  margin-bottom: 10px;
  ${FONT.body4};
`;

export const CommentList = styled.div`
  margin-top: 40px;
  padding-left: 24px;
`;
