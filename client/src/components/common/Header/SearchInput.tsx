import React, { useRef, KeyboardEvent, useState, ChangeEvent } from 'react';
import * as Styled from './SearchInput.styles';

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
    <Styled.Wrapper>
      <Styled.Container active={active} onClick={onClick}>
        <Styled.Text>검색</Styled.Text>
        <Styled.Input
          data-testid="search-input"
          type="text"
          placeholder={placeholder}
          ref={input}
          onChange={handleClick}
          onKeyDown={handleKeydown}
        />
        <Styled.Icon data-testid="search-icon" onClick={handleSubmit}>
          <SearchIcon />
        </Styled.Icon>
      </Styled.Container>
    </Styled.Wrapper>
  );
}
