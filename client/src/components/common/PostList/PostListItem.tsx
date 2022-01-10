import React, { useMemo } from 'react';
import * as Styled from './PostListItem.styles';

import PostListThumbnail from '@/components/common/PostList/PostListThumbnail';
import TagList from '@/components/common/Tag/TagList';

import Post from '@/types/Post';
import ENV from '@/constants/env';

export interface PostListItemProps {
  post: Post;
}

export default function PostListItem(props: PostListItemProps): JSX.Element {
  const { post } = props;
  const isAdmin = useMemo<boolean>(
    () => post.user.nickname === ENV.ADMIN_USER_NICKNAME,
    [post],
  );

  return (
    <Styled.PostListItem>
      <Styled.Thumbnail>
        <PostListThumbnail {...post} />
      </Styled.Thumbnail>
      <Styled.UserInfo admin={isAdmin}>
        <Styled.UserImage
          src={post.user.image}
          alt={post.user.nickname}
          width="18px"
          height="18px"
        />
        <Styled.UserNickname>{post.user.nickname}</Styled.UserNickname>
        <Styled.CreatedAt>{post.createdAt}</Styled.CreatedAt>
      </Styled.UserInfo>
      <Styled.Contents>
        <Styled.Description>{post.description}</Styled.Description>
        {post.tags && <TagList tags={post.tags} />}
        <Styled.SocialInfo>
          좋아요 {post.likes}개<Styled.Dot>·</Styled.Dot>
          덧글 {post.comments}개
        </Styled.SocialInfo>
      </Styled.Contents>
    </Styled.PostListItem>
  );
}
