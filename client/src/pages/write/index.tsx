import React, { useMemo, useState } from 'react';
import * as Styled from '@/components/write/index.styles';

import WriteHeader from '@/components/write/WriteHeader';
import PostEditor from '@/components/write/Editor/PostEditor';
import WriteModal, {
  WriteModalFormProps,
} from '@/components/write/Modal/WriteModal';

import { MAX_TITLE_LENGTH } from '@/constants/validations';
import MESSAGE from '@/constants/messages';
import apis from '@/apis';
import { CreatePostRequest } from '@/apis/posts';
import { useRouter } from 'next/router';
import { getToday } from '@/utils/days';

export default function PostPage(): JSX.Element {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [headerMessage, setHeaderMessage] = useState<string | null>('');
  const headerDefaultMessage = useMemo<string>(
    () => `${getToday()} TIL 작성 중...`,
    [],
  );

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
      setHeaderMessage(MESSAGE.TITLE.ERROR_LENGTH);
      return;
    }
    setHeaderMessage(null);
    setTitle(newTitle);
  };

  const handleOpenModal = () => {
    if (!title) {
      setHeaderMessage(MESSAGE.TITLE.ERROR_EMPTY);
      return;
    }
    setHeaderMessage(null);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <Styled.Container>
      <WriteHeader
        message={headerMessage || headerDefaultMessage}
        state={headerMessage ? 'error' : 'default'}
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
