import React, { FocusEvent, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type Rule = {
  rule: (value: string) => boolean;
  message: string;
};

export interface InputProps {
  title: string;
  hint: string;
  placeholder: string;
  width?: string;
  height?: string;
  rules: Rule[];
}

export default function Input(props: InputProps): JSX.Element {
  const { title, placeholder, hint, width, height, rules } = props;
  const [feedback, setFeedback] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const invalidRule = rules.find(({ rule }) => rule(value));
    setIsValid(!invalidRule);
    if (invalidRule) {
      setFeedback(invalidRule.message);
    }
  };

  return (
    <Container width={width}>
      <Label>
        <Title>{title}</Title>
        {isValid ? <Text>{hint}</Text> : <Feedback>{feedback}</Feedback>}
      </Label>
      <StyledInput
        isValid={isValid}
        height={height}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </Container>
  );
}

interface ContainerProps {
  width?: string;
}

const Container = styled.div<ContainerProps>`
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};
  white-space: nowrap;
  font-style: normal;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Title = styled.span`
  font-size: 10px;
  line-height: 16px;
  font-weight: bold;
  margin-right: 8px;
`;

interface StyledInputProps {
  height?: string;
  isValid: boolean;
}

const Feedback = styled.span`
  font-size: 8px;
  line-height: 16px;
  color: #c90909;
  font-style: normal;
`;

const Text = styled.span`
  font-size: 8px;
  line-height: 16px;
  color: #666666;
  font-style: normal;
`;

const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  border: 1px solid;
  border-radius: 8px;
  font-size: 10px;
  padding: 7px 8px;
  background: #f3f3f3;

  ${({ isValid }) => styleIsValid(isValid)};
`;

const styleIsValid = (isValid: boolean) => {
  if (isValid) {
    return css`
      border-color: #f3f3f3;
      &::placeholder {
        color: #cdcdcd;
      }
    `;
  } else {
    return css`
      border-color: #c90909;
      &::placeholder {
        color: #c90909;
      }
    `;
  }
};
