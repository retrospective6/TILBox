import React, { InputHTMLAttributes } from 'react';
import * as Styled from './TextInput.styles';
import { State } from '@/types';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  state?: State;
  message?: string;
  width?: string;
  height?: string;
}

export default function TextInput(props: TextInputProps): JSX.Element {
  const { title, state, message } = props;

  return (
    <Styled.Container>
      <Styled.Label>
        {title && <Styled.Title>{title}</Styled.Title>}
        {message && <Styled.Message state={state}>{message}</Styled.Message>}
      </Styled.Label>
      <Styled.Input {...props} />
    </Styled.Container>
  );
}
