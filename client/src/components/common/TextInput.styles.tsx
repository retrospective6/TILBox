import styled from '@emotion/styled';
import { css } from '@emotion/react';
import FONT from '@/styles/font';

export const Container = styled.div`
  white-space: nowrap;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export const Title = styled.span`
  margin-right: 8px;
  ${FONT.caption1};
`;

export const Feedback = styled.span`
  ${FONT.caption4};
  color: #c90909;
`;

export const Hint = styled.span`
  ${FONT.caption4};
  color: #666666;
`;

interface StyledInputProps {
  width?: string;
  height?: string;
  isValid: boolean;
}

export const Input = styled.input<StyledInputProps>`
  width: ${(props) => props.width || '268px'};
  height: ${(props) => props.height || '28px'};
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 8px;
  padding: 7px 8px;
  background: #f3f3f3;
  ${FONT.body4};

  ${({ isValid }) => css`
    border-color: ${isValid ? '#f3f3f3' : '#c90909'};
    &::placeholder {
      color: ${isValid ? '#cdcdcd' : '#c90909'};
    }
  `};
`;
