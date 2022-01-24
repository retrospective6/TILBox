import React, { useEffect, useState } from 'react';
import * as Styled from '@/components/post/PostViewer.style';

import Post, { ThumbnailGradation } from '@/types/Post';

import TagList from '@/components/common/Tag/TagList';
import dynamic from 'next/dynamic';
import CommentList from '@/components/post/CommentList/CommentList';
const ToastViewer = dynamic(() => import('./ToastViewer'), {
  ssr: false,
});

import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export interface PostViewerProps {
  post: Post;
  onSubmitComment: (value: string, postId: number, commentId?: number) => void;
  onReportComment: (id: number) => void;
}

export default function PostViewer(props: PostViewerProps): JSX.Element {
  const { post, onSubmitComment, onReportComment } = props;
  const { title, thumbnail, user, createdAt, content, tags } = post;
  const [imgSrc, setImgSrc] = useState<string>();
  const [gradation, setGradation] = useState<ThumbnailGradation>();

  useEffect(() => {
    if (thumbnail.type === 'image') {
      setImgSrc(thumbnail.value as string);
      return;
    }

    setGradation(thumbnail.value as ThumbnailGradation);
  }, [thumbnail]);

  const handleSubmitComment = (value: string, commentId?: number) => {
    onSubmitComment(value, post.id, commentId);
  };

  return (
    <>
      <Styled.Title start={gradation?.start} end={gradation?.end}>
        {imgSrc && (
          <Styled.ThumbnailImg src={imgSrc} alt={title} layout="fill" />
        )}
        {post.title}
      </Styled.Title>
      <Styled.Section>
        <Styled.Info>
          <Styled.UserInfo>
            <Styled.UserImage
              src={user.image}
              alt={user.nickname}
              width="18px"
              height="18px"
            />
            <Styled.UserNickname>{user.nickname}</Styled.UserNickname>
          </Styled.UserInfo>
          <Styled.CreatedAt>
            {dayjs(createdAt).format(DATE_FORMAT)}
          </Styled.CreatedAt>
        </Styled.Info>
        <Styled.Content>
          <ToastViewer initialValue={content} />
        </Styled.Content>
        {tags && <TagList tags={tags} />}
        <CommentList
          comments={post.comments}
          onSubmitComment={handleSubmitComment}
          onReportComment={onReportComment}
        />
      </Styled.Section>
    </>
  );
}
