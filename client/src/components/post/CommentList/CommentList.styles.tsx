import styled from '@emotion/styled';
import FONT from '@/styles/font';

import Image from 'next/image';

export const Container = styled.form`
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

export const CommentListItem = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`;

export const ProfileImgWrapper = styled.div`
  margin-bottom: auto;
`;

export const ProfileImg = styled(Image)`
  border-radius: 50%;
`;

export const Comment = styled.div`
  margin-left: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CommentInfo = styled.div`
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Nickname = styled.span`
  margin-right: 10px;
  ${FONT.caption1};
`;

export const CreatedAt = styled.span`
  ${FONT.caption4};
  font-size: 8px !important;
`;

export const Report = styled.button`
  margin-left: auto;
  ${FONT.caption4};
  background: none;
`;

export const Content = styled.div`
  padding-right: 16px;
  ${FONT.body4};
  white-space: pre-wrap;
`;
