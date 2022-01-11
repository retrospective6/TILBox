import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import * as Styled from './CommentInput.styles';

import User from '@/types/User';
import Button from '@/components/common/Button';

export interface CommentInputProps {
  user: User;
  onSubmit: (value: string) => void;
}

export default function CommentInput(props: CommentInputProps): JSX.Element {
  const { user, onSubmit } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleClickLabel = () => {
    textAreaRef.current?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <Styled.Container onSubmit={handleSubmit}>
      <Styled.Profile>
        <Styled.ProfileImg
          src={user.image}
          alt={user.nickname}
          width="34px"
          height="34px"
        />
        <Styled.Nickname>{user.nickname}</Styled.Nickname>
      </Styled.Profile>
      <Styled.Label onClick={handleClickLabel}>
        <Styled.TextArea
          placeholder="응원의 댓글은 1000자 이하로 남길 수 있습니다"
          value={inputValue}
          ref={textAreaRef}
          onChange={handleChangeTextArea}
        />
        <Button type="submit" variant="primary" bold>
          등록
        </Button>
      </Styled.Label>
    </Styled.Container>
  );
}
