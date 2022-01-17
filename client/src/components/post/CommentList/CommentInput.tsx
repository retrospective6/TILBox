import React, { ChangeEvent, useRef, useState } from 'react';
import * as Styled from './CommentInput.styles';

import Button from '@/components/common/Button';
import { USER } from '@mocks/MockData';

export interface CommentInputProps {
  onSubmit: (value: string) => void;
}

export default function CommentInput(props: CommentInputProps): JSX.Element {
  const { onSubmit } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //TODO: api 연결 후 접속 유저 정보 가져오기
  const user = USER;

  const handleClickLabel = () => {
    textAreaRef.current?.focus();
  };

  const handleSubmit = () => {
    onSubmit(inputValue.replace(/\n{10,}/g, '\n\n\n\n\n\n\n\n\n'));
    setInputValue('');
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
          data-testid="comment-textarea"
          placeholder="응원의 댓글은 1000자 이하로 남길 수 있습니다"
          name="comment"
          value={inputValue}
          maxRows={9}
          ref={textAreaRef}
          onChange={handleChangeTextArea}
        />
        <Styled.ButtonWrapper>
          <Button
            data-testid="comment-submit-button"
            variant="primary"
            bold
            onClick={handleSubmit}
          >
            등록
          </Button>
        </Styled.ButtonWrapper>
      </Styled.Label>
    </Styled.Container>
  );
}
