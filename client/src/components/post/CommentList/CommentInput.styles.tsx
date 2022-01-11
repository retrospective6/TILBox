import styled from '@emotion/styled';
import FONT from '@/styles/font';

import Image from 'next/image';

export const Container = styled.form`
  display: flex;
  align-items: center;
`;

export const Profile = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImg = styled(Image)`
  border-radius: 50%;
`;

export const Nickname = styled.span`
  margin-top: 4px;
  ${FONT.caption1};
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

export const TextArea = styled.textarea`
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
`;
