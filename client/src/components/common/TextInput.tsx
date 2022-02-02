import React, { InputHTMLAttributes, KeyboardEvent } from 'react';
import * as Styled from './TextInput.styles';
import { State } from '@/types';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  state?: State;
  message?: string;
  width?: string;
  height?: string;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: TextInputProps): JSX.Element {
  const { title, state, message, onKeyPress } = props;

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
    if (onKeyPress) {
      onKeyPress(event);
    }
  };

  return (
    <Styled.Container>
      <Styled.Label>
        {title && <Styled.Title>{title}</Styled.Title>}
        {message && <Styled.Message state={state}>{message}</Styled.Message>}
      </Styled.Label>
      <Styled.Input {...props} onKeyPress={handleKeyPress} />
    </Styled.Container>
  );
}
