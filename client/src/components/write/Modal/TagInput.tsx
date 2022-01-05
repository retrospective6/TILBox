import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import * as Styled from './TagInput.styles';

import DeleteIcon from '@/assets/icon/DeleteTagIcon.svg';

export interface TagInputProps {
  onChange: (tagList: string[]) => void;
}

export default function TagInput(props: TagInputProps): JSX.Element {
  const { onChange } = props;
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToEnd = () => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.scrollLeft = containerRef.current.scrollWidth;
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    scrollToEnd();
  };

  const handleKeyUpInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== ' ') {
      return;
    }
    event.preventDefault();
    const newTag = inputValue;
    if (tags.includes(newTag) || !newTag) {
      return;
    }
    const newTags = [...tags, newTag];
    setTags(newTags);
    setInputValue('');
    onChange(newTags);
    scrollToEnd();
  };

  const handleDeleteTag = (index: number) => () => {
    tags.splice(index, 1);
    setTags([...tags]);
  };

  return (
    <Styled.Container onClick={handleClick} ref={containerRef}>
      {tags.map((tag, i) => (
        <Styled.Tag key={i}>
          #{tag}
          <Styled.DeleteButton type="button" onClick={handleDeleteTag(i)}>
            <DeleteIcon />
          </Styled.DeleteButton>
        </Styled.Tag>
      ))}
      <Styled.TextInput
        data-testid="tag-input"
        value={inputValue}
        onChange={handleChangeInput}
        onKeyUp={handleKeyUpInput}
        ref={inputRef}
      />
    </Styled.Container>
  );
}
