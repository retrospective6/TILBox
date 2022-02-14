import { useState } from 'react';
import { State } from '@/types';

export type UseTextInputReturn = [
  message: string,
  state: State,
  setInput: (values: SetInputProps) => void,
];

export interface SetInputProps {
  message?: string;
  state?: State;
}

export default function useTextInput(
  initialMessage: string,
): UseTextInputReturn {
  const [message, setMessage] = useState<string>(initialMessage);
  const [state, setState] = useState<State>('default');

  const setInput = (value: SetInputProps): void => {
    if (value.message) {
      setMessage(value.message);
    }
    if (value.state) {
      setState(value.state);
    }
  };

  return [message, state, setInput];
}
