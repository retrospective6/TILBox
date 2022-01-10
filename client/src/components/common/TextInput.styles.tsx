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
  margin-bottom: 2px;
`;

export const Title = styled.span`
  margin-right: 8px;
  ${FONT.caption1};
  color: #000000;
`;

interface MessageProps {
  state?: State;
}

export const Message = styled.span<MessageProps>`
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
    border-color: #f3f3f3;
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

export const Input = styled.input<StyledInputProps>`
  width: ${(props) => props.width || '268px'};
  height: ${(props) => props.height || '28px'};
  padding: 7px 8px;
  border: 1px solid;
  border-radius: 8px;
  background: #f3f3f3;
  ${FONT.body4};

  ${({ state = 'default' }) => stateCSS[state]};
`;
