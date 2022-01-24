import styled from '@emotion/styled';
import FONT from '@/styles/font';

import Image from 'next/image';
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.form`
  display: flex;
`;

export const Profile = styled.div`
  margin-top: 2px;
  margin-bottom: auto;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImg = styled(Image)`
  border-radius: 50%;
`;

export const DefaultProfileImg = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #c4c4c4;
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
  margin: 5px 6px auto 14px;
`;
