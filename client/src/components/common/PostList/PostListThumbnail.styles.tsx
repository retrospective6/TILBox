import styled from '@emotion/styled';
import { css } from '@emotion/react';
import FONT from '@/styles/font';

import Image from 'next/image';
import { ThumbnailGradation } from '@/types/Post';

export const Thumbnail = styled.div<Partial<ThumbnailGradation>>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ start, end }) =>
    start && end
      ? css`linear-gradient(111.34deg, ${start} 3.55%, ${end} 113.48%)`
      : 'black'};
`;

export const ThumbnailImg = styled(Image)`
  opacity: 0.8;
`;

export interface ThumbnailTextProps {
  length: number;
}

const ShortTextCss = css`
  ${FONT.title2};
`;

const LongTextCss = css`
  ${FONT.title3};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: keep-all;
`;

export const ThumbnailText = styled.div<ThumbnailTextProps>`
  z-index: 1;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  ${({ length }) => (length <= 8 ? ShortTextCss : LongTextCss)};
  max-width: ${({ length }) => length > 12 && '70%'};
`;
