import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import FONT from '@/styles/font';

export interface TitleProps {
  start?: string;
  end?: string;
}

export const Title = styled.h1<TitleProps>`
  display: flex;
  position: relative;
  width: 100%;
  height: 300px;
  ${FONT.title1};
  align-items: center;
  justify-content: center;
  color: white;

  background: ${({ start, end }) =>
    start && end
      ? css`linear-gradient(111.34deg, ${start} 3.55%, ${end} 113.48%)`
      : 'black'};
`;

export const ThumbnailImg = styled(Image)`
  opacity: 0.8;
`;

export const Section = styled.section`
  width: 730px;
  margin: 0 auto;
`;

export const Info = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 34px;
  font-weight: bold;
`;

export const UserImage = styled(Image)`
  border-radius: 50%;
`;

export const UserNickname = styled.span`
  margin-left: 5px;
`;

export const CreatedAt = styled.span`
  ${FONT.caption4}
`;

export const Content = styled.article`
  margin-bottom: 15px;
`;
