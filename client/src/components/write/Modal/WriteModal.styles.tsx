import styled from '@emotion/styled';
import { css } from '@emotion/react';
import FONT from '@/styles/font';

import Image from 'next/image';
import { ThumbnailGradient } from '@/types/Post';

export const Form = styled.form`
  display: flex;
  width: 812px;
  height: 498px;
  padding: 80px 60px;
`;

export const Column = styled.div`
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
`;

export const Cell = styled.div`
  margin-bottom: 16px;
`;

export const Title = styled.div`
  margin-bottom: 10px;
  ${FONT.title1};
  color: #000000;
`;

export const Description = styled.div`
  margin-bottom: 8px;
  ${FONT.caption2};
  color: #666666;
`;

export const ColorList = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const ColorListText = styled.span`
  margin-right: auto;
  ${FONT.body1};
`;

export const ColorListItem = styled.div<ThumbnailGradient>`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  cursor: pointer;

  ${({ start, end }) =>
    css`
      background: linear-gradient(111.34deg, ${start} 3.55%, ${end} 113.48%);
    `};
`;

interface ThumbnailSelectorProps {
  gradient?: ThumbnailGradient;
}

export const ThumbnailSelector = styled.div<ThumbnailSelectorProps>`
  position: relative;
  width: 100%;
  height: 170px;
  background: ${({ gradient }) =>
    gradient
      ? css`
          linear-gradient(
            111.34deg,
            ${gradient.start} 3.55%,
            ${gradient.end} 113.48%
          );
        `
      : '#000000'};
`;

export const ThumbnailImage = styled(Image)`
  opacity: 0.8;
`;

export const ThumbnailText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${FONT.title3};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const PlusIcon = styled.span`
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #006bd4;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 76px;
  padding: 7px 8px;
  border: none;
  border-radius: 8px;
  background: #f3f3f3;
  ${FONT.body4};
  resize: none;
`;

export const VisibleLevelSelector = styled.div`
  display: flex;
  gap: 55px;
`;

export const ButtonContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
  display: flex;
  gap: 13px;
`;
