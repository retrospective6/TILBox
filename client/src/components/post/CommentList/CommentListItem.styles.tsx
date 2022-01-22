import styled from '@emotion/styled';
import { css } from '@emotion/react';
import FONT from '@/styles/font';

import Image from 'next/image';
import TriangleDown from '@/assets/icon/TriangleDown.svg';

export const Container = styled.div`
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

export const NestedCommentInfo = styled.div`
  margin-top: 8px;
  ${FONT.caption2};
  display: flex;
  align-items: center;
  gap: 15px;
  span {
    cursor: pointer;
  }
`;

interface TriangleProps {
  rotate: boolean;
}

export const Triangle = styled(TriangleDown)<TriangleProps>`
  margin-right: 4px;
  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotate(180deg);
    `};
`;

interface InputWrapperProps {
  hidden: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  margin-top: 15px;
  ${({ hidden }) =>
    hidden &&
    css`
      display: none;
    `}
`;

export const NestedComment = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
`;
