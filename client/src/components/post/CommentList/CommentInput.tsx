import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import * as Styled from './CommentInput.styles';

import Button from '@/components/common/Button';

import useProfile from '@/hooks/useProfile';
import { getRandomGradation } from '@/utils';
import { Gradation } from '@/types';

export interface CommentInputProps {
  onSubmit: (value: string) => void;
}

export default function CommentInput(props: CommentInputProps): JSX.Element {
  const { onSubmit } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const gradation = useMemo<Gradation>(() => getRandomGradation(), []);

  const { profile } = useProfile();

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
        {profile ? (
          <>
            <Styled.ProfileImg
              src={profile.image}
              alt={profile.nickname}
              width="34px"
              height="34px"
            />
            <Styled.Nickname>{profile.nickname}</Styled.Nickname>
          </>
        ) : (
          <Styled.DefaultImg gradation={gradation} />
        )}
      </Styled.Profile>
      <Styled.Label onClick={handleClickLabel}>
        <Styled.TextArea
          data-testid="comment-textarea"
          placeholder={
            profile
              ? '응원의 댓글은 1000자 이하로 남길 수 있습니다'
              : '덧글을 남기려면 로그인이 필요합니다'
          }
          name="comment"
          value={inputValue}
          maxRows={9}
          disabled={!profile}
          ref={textAreaRef}
          onChange={handleChangeTextArea}
        />
        <Styled.ButtonWrapper>
          <Button
            data-testid="comment-submit-button"
            variant="primary"
            bold
            onClick={profile ? handleSubmit : undefined}
          >
            {profile ? '등록' : '로그인'}
          </Button>
        </Styled.ButtonWrapper>
      </Styled.Label>
    </Styled.Container>
  );
}
