import React, { useEffect, useState } from 'react';
import * as Styled from '@/components/post/PostViewer.style';
import { TitleProps } from '@/components/post/PostViewer.style';

import Post from '@/types/Post';

import TagList from '@/components/common/Tag/TagList';

import dynamic from 'next/dynamic';
import CommentList from '@/components/post/CommentList/CommentList';
const ToastViewer = dynamic(() => import('./ToastViewer'), {
  ssr: false,
});

export interface PostViewerProps {
  post: Post;
  onSubmitComment: (value: string, postId: number, commentId?: number) => void;
  onReportComment: (id: number) => void;
}

export default function PostViewer(props: PostViewerProps): JSX.Element {
  const { post, onSubmitComment, onReportComment } = props;
  const { title, thumbnail, user, createdAt, content, tags } = post;
  const [imgSrc, setImgSrc] = useState<string>();
  const [gradient, setGradient] = useState<TitleProps>();

  useEffect(() => {
    if (thumbnail.img) {
      setImgSrc(thumbnail.img);
      return;
    }

    setGradient(thumbnail.gradient);
  }, [thumbnail]);

  const handleSubmitComment = (value: string, commentId?: number) => {
    onSubmitComment(value, post.id, commentId);
  };

  return (
    <>
      <Styled.Title start={gradient?.start} end={gradient?.end}>
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
          <Styled.CreatedAt>{createdAt}</Styled.CreatedAt>
        </Styled.Info>
        <Styled.Content>
          <ToastViewer initialValue={content} />
        </Styled.Content>
        {tags && <TagList tags={tags} />}
        <CommentList
          comments={post.comments}
          onSubmit={handleSubmitComment}
          onReport={onReportComment}
        />
      </Styled.Section>
    </>
  );
}
