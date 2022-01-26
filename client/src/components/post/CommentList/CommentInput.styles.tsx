import styled from '@emotion/styled';
import FONT from '@/styles/font';

import Image from 'next/image';
import TextareaAutosize from 'react-textarea-autosize';
import { css } from '@emotion/react';
import { Gradation } from '@/types';

export const Container = styled.form`
  display: flex;
`;

export const Profile = styled.div`
  margin-top: 2px;
  margin-bottom: auto;
  height: 56px;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileImg = styled(Image)`
  border-radius: 50%;
`;

export interface DefaultImgProps {
  gradation: Gradation;
}

export const DefaultImg = styled.div<DefaultImgProps>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ gradation }) =>
    css`
      linear-gradient(
        111.34deg,
        ${gradation.start} 3.55%,
        ${gradation.end} 113.48%
      );`};
`;

export const Nickname = styled.span`
  margin-top: 6px;
  ${FONT.caption1};
  text-align: center;
  word-break: keep-all;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 8px;
  background: #f3f3f3;
  border-radius: 4px;

  &:focus-within {
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

export const TextArea = styled(TextareaAutosize)`
  min-height: 100%;
  flex: 1;
  border: none;
  background: transparent;
  resize: none;
  ${FONT.body4};

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #cdcdcd;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: #bbbbbb;
    border-radius: 10px;
    &:hover {
      background-color: #888888;
    }
  }
  ::-webkit-scrollbar-track {
    background-color: #dddddd;
  }
`;

export const ButtonWrapper = styled.div`
  margin: 5px 0 auto 14px;
`;
