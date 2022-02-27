import styled from '@emotion/styled';
import FONT from '@/styles/font';

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

export const ButtonWrapper = styled.div`
  margin: 5px 14px auto auto;
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

export const LoginLabel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 8px;
  background: #f3f3f3;
  border-radius: 4px;
`;

export const LoginText = styled.div`
  margin-bottom: auto;
  ${FONT.body4};
  color: #cdcdcd;
`;
