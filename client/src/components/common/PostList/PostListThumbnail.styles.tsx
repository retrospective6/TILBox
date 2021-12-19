import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';

export interface ThumbnailProps {
  start?: string;
  end?: string;
}

export const Thumbnail = styled.div<ThumbnailProps>`
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
  font-size: 24px;
  line-height: 34px;
`;

const LongTextCss = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 18px;
  line-height: 24px;
  word-break: keep-all;
`;

export const ThumbnailText = styled.div<ThumbnailTextProps>`
  z-index: 1;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  ${({ length }) => (length <= 8 ? ShortTextCss : LongTextCss)};
  max-width: ${({ length }) => length > 12 && '70%'};
`;
