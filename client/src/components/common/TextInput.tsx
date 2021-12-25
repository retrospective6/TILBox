import React, { FocusEvent, InputHTMLAttributes, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import FONT from '@/styles/font';

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
    <Container>
      <Label>
        <Title>{title}</Title>
        {isValid ? <Hint>{hint}</Hint> : <Feedback>{feedback}</Feedback>}
      </Label>
      <StyledInput onBlur={onBlur} isValid={isValid} {...props} />
    </Container>
  );
}

const Container = styled.div`
  white-space: nowrap;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Title = styled.span`
  margin-right: 8px;
  ${FONT.caption1};
`;

const Feedback = styled.span`
  ${FONT.caption4};
  color: #c90909;
`;

const Hint = styled.span`
  ${FONT.caption4};
  color: #666666;
`;

interface StyledInputProps {
  width?: string;
  height?: string;
  isValid: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
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
