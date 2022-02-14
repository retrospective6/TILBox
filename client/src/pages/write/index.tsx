import React, { useState } from 'react';
import * as Styled from '@/components/write/index.styles';

import WriteHeader from '@/components/write/WriteHeader';
import PostEditor from '@/components/write/Editor/PostEditor';
import WriteModal, {
  WriteModalFormProps,
} from '@/components/write/Modal/WriteModal';

import { MAX_TITLE_LENGTH } from '@/constants/validations';
import {
  TITLE_EMPTY_ERROR_MESSAGE,
  TITLE_LENGTH_ERROR_MESSAGE,
} from '@/constants/messages';
import { State } from '@/types';
import apis from '@/apis';
import { CreatePostRequest } from '@/apis/posts';
import { useRouter } from 'next/router';

export default function PostPage(): JSX.Element {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [headerMessage, setHeaderMessage] = useState<string>('');
  const [headerState, setHeaderState] = useState<State>('default');

  const handleSubmitPost = async (props: WriteModalFormProps) => {
    const post: CreatePostRequest = {
      title,
      content,
      ...props,
    };
    const id = await apis.posts.write(post);
    await router.push('/posts/' + id);
  };

  const handleChangeEditor = (newTitle: string, newContent: string) => {
    setContent(newContent);

    if (newTitle.length > MAX_TITLE_LENGTH) {
      setHeaderState('error');
      setHeaderMessage(TITLE_LENGTH_ERROR_MESSAGE);
      return;
    }
    setHeaderState('default');
    // TODO: api 연동 후 user nickname, post length 가져와야함
    setHeaderMessage('nickname님이 n번째 TIL을 작성 중...');
    setTitle(newTitle);
  };

  const handleOpenModal = () => {
    if (!title) {
      setHeaderState('error');
      setHeaderMessage(TITLE_EMPTY_ERROR_MESSAGE);
      return;
    }
    setHeaderState('default');
    // TODO: api 연동 후 user nickname, post length 가져와야함
    setHeaderMessage('nickname님이 n번째 TIL을 작성 중...');
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <Styled.Container>
      <WriteHeader
        state={headerState}
        message={headerMessage}
        onSubmit={handleOpenModal}
      />
      <Styled.EditorWrapper>
        <PostEditor onChange={handleChangeEditor} />
      </Styled.EditorWrapper>
      {modal && (
        <WriteModal onClose={handleCloseModal} onSubmit={handleSubmitPost} />
      )}
    </Styled.Container>
  );
}
