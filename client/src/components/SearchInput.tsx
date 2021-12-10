import React, { useRef, KeyboardEvent, useState, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import SearchIcon from '@/assets/icon/SearchIcon.svg';

export interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export default function SearchInput(props: SearchInputProps): JSX.Element {
  const { placeholder, onSearch } = props;
  const [active, setActive] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);

  const onClick = () => {
    input.current?.focus();
  };

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setActive(!!value);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    handleSubmit();
  };

  const handleSubmit = () => {
    if (!input.current?.value) {
      return;
    }
    const value = input.current?.value;
    onSearch(value);
  };

  return (
    <Container active={active} onClick={onClick}>
      <Text>검색</Text>
      <Input
        data-testid="search-input"
        type="text"
        placeholder={placeholder}
        ref={input}
        onChange={handleClick}
        onKeyDown={handleKeydown}
      />
      <Icon data-testid="search-icon" onClick={handleSubmit}>
        <SearchIcon />
      </Icon>
    </Container>
  );
}

interface ContainerProps {
  active: boolean;
}

const activeCSS = css`
  border: 1px solid #cdcdcd;
  width: 550px;
  background-color: #ffffff;
  span:first-of-type {
    visibility: hidden;
  }
  input {
    visibility: visible;
    width: 500px;
    margin: 9px;
  }
`;

const Container = styled.div<ContainerProps>`
  display: flex;
  width: 60px;
  height: 30px;
  margin: 18px;
  border: 0 solid #cdcdcd;
  border-radius: 8px;
  background-color: transparent;
  align-items: center;
  transition: width 0.35s;

  input {
    visibility: hidden;
    width: 0;
    padding: 0;
    margin: 0;
    transition: width 0.35s;
  }
  &:hover,
  &:focus,
  &:focus-within {
    ${activeCSS}
  }
  ${({ active }) => active && activeCSS}
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
  margin-right: 5px;
  cursor: pointer;
`;
