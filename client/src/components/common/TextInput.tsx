import React, { FocusEvent, InputHTMLAttributes, useState } from 'react';
import * as Styled from './TextInput.styles';

export type Rule = {
  rule: (value: string) => boolean;
  message: string;
};

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  rules?: Rule[];
  hint?: string;
  width?: string;
  height?: string;
}

export default function TextInput(props: TextInputProps): JSX.Element {
  const { title, hint, rules } = props;
  const [feedback, setFeedback] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!rules) {
      return;
    }
    const value = event.target.value;
    const invalidRule = rules.find(({ rule }) => rule(value));
    setIsValid(!invalidRule);
    if (invalidRule) {
      setFeedback(invalidRule.message);
    }
  };

  return (
    <Styled.Container>
      <Styled.Label>
        <Styled.Title>{title}</Styled.Title>
        {isValid ? (
          <Styled.Hint>{hint}</Styled.Hint>
        ) : (
          <Styled.Feedback>{feedback}</Styled.Feedback>
        )}
      </Styled.Label>
      <Styled.Input onBlur={onBlur} isValid={isValid} {...props} />
    </Styled.Container>
  );
}
