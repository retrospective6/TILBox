import React, { useState } from 'react';
import * as Styled from '@/components/write/index.styles';

import WriteHeader from '@/components/write/WriteHeader';
import PostEditor from '@/components/write/Editor/PostEditor';
import WriteModal, {
  WriteModalFormProps,
} from '@/components/write/Modal/WriteModal';

export default function PostPage(): JSX.Element {
  // TODO: login에 따른 라우팅 및 헤더 메시지 출력
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);

  const handleSubmitPost = (props: WriteModalFormProps) => {
    const post = {
      title,
      content,
      ...props,
    };
    // TODO: createPost api
  };

  const handleChangeEditor = (newTitle: string, newContent: string) => {
    setTitle(newTitle);
    setContent(newContent);
  };

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      <WriteHeader onSubmit={handleOpenModal} />
      <Styled.EditorWrapper>
        <PostEditor onChange={handleChangeEditor} />
      </Styled.EditorWrapper>
      {modal && (
        <WriteModal onClose={handleCloseModal} onSubmit={handleSubmitPost} />
      )}
    </>
  );
}
