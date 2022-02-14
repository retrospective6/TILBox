import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import FONT from '@/styles/font';
import { State } from '@/types';

export const Container = styled.label`
  width: min-content;
  white-space: nowrap;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.span`
  margin-right: 8px;
  margin-bottom: 4px;
  ${FONT.caption1};
  color: #000000;
`;

interface MessageProps {
  state?: State;
}

export const Message = styled.span<MessageProps>`
  margin-bottom: 4px;
  ${FONT.caption4};
  color: ${({ state }) => (state === 'error' ? '#c90909' : '#666666')};
`;

interface StyledInputProps {
  state?: State;
  width?: string;
  height?: string;
}

const stateCSS: { [keys in State]: SerializedStyles } = {
  default: css`
    border-color: transparent;
    &::placeholder {
      color: #cdcdcd;
    }
  `,
  error: css`
    border-color: #c90909;
    &::placeholder {
      color: #c90909;
    }
  `,
};

export const InputWrapper = styled.div<StyledInputProps>`
  width: ${(props) => props.width || '268px'};
  height: ${(props) => props.height || '34px'};
  padding: 7px 8px;
  border: 1px solid;
  border-radius: 8px;
  background: #f3f3f3;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:focus-within {
    outline: 5px auto -webkit-focus-ring-color;
  }

  ${({ state = 'default' }) => stateCSS[state]};
`;

export const Input = styled.input<StyledInputProps>`
  width: 100%;
  background: transparent;
  ${FONT.body4};
  border: none;
  &:focus {
    outline: none;
  }

  ${({ state = 'default' }) => stateCSS[state]};
`;
