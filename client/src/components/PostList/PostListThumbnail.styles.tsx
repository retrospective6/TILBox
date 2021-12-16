import styled from '@emotion/styled';
import { css } from '@emotion/react';

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

  ${({ start, end }) =>
    !!start &&
    !!end &&
    css`
      background: linear-gradient(111.34deg, ${start} 3.55%, ${end} 113.48%);
    `}
`;

export interface ThumbnailTextProps {
  length: number;
}

const ShortTextCss = css`
  font-size: 24px;
  line-height: 34px;
`;

const LongTextCss = css`
  font-size: 18px;
  line-height: 24px;
  word-break: keep-all;
`;

export const ThumbnailText = styled.div<ThumbnailTextProps>`
  width: 150px;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  ${({ length }) => (length <= 8 ? ShortTextCss : LongTextCss)}
`;
