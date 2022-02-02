import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useRef,
} from 'react';
import * as Styled from './TextInput.styles';
import { State } from '@/types';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  state?: State;
  message?: string;
  width?: string;
  height?: string;
  icon?: ReactNode;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: TextInputProps): JSX.Element {
  const { title, state, message, width, height, icon, onKeyPress } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickInputWrapper = () => {
    inputRef.current?.focus();
  };

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
      <Styled.InputWrapper
        width={width}
        height={height}
        data-testid="text-input"
        onClick={handleClickInputWrapper}
      >
        <Styled.Input {...props} onKeyPress={handleKeyPress} ref={inputRef} />
        {icon && icon}
      </Styled.InputWrapper>
    </Styled.Container>
  );
}
