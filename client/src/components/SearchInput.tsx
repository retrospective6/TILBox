import React, { useRef, KeyboardEvent } from 'react';
import styled from '@emotion/styled';

export interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export default function SearchInput(props: SearchInputProps): JSX.Element {
  const { placeholder, onSearch } = props;
  const input = useRef<HTMLInputElement>(null);

  const onClick = () => {
    input.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    onSubmitValue();
  };

  const onSubmitValue = () => {
    const value = input.current?.value || '';
    onSearch(value);
  };

  return (
    <Container onClick={onClick}>
      <Text>검색</Text>
      <Input
        data-testid="search-input"
        type="text"
        placeholder={placeholder}
        ref={input}
        onKeyDown={onKeyDown}
      />
      <Icon>
        <svg
          data-testid="search-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onSubmitValue}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C13.2091 7 15 8.79086 15 11ZM14.4765 15.8907C13.4957 16.5892 12.2958 17 11 17C7.68629 17 5 14.3137 5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11C17 12.2958 16.5892 13.4957 15.8907 14.4765L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L14.4765 15.8907Z"
            fill="black"
          />
        </svg>
      </Icon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 75px;
  height: 30px;
  padding: 9px;
  border: 0 solid #cdcdcd;
  border-radius: 8px;
  background-color: transparent;
  align-items: center;
  transition: width 0.35s;

  input {
    visibility: hidden;
    width: 0;
    padding: 0;
    transition: width 0.35s;
  }
  &:hover,
  &:focus,
  &:focus-within {
    border: 1px solid #cdcdcd;
    width: 550px;
    background-color: #ffffff;
    span:first-child {
      visibility: hidden;
    }
    input {
      visibility: visible;
      width: 40%;
    }
  }
`;

const Text = styled.span`
  position: absolute;
  font-size: 18px;
  line-height: 22px;
  white-space: nowrap;
`;

const Input = styled.input`
  position: absolute;
  flex: 1;
  border: none;
  outline: none;
  font-size: 10px;
  line-height: 16px;

  ::placeholder {
    color: #cdcdcd;
  }
`;

const Icon = styled.span`
  margin-left: auto;
`;
