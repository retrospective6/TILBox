import React, { useMemo } from 'react';
import * as Styled from './PostListItem.styles';

import PostListThumbnail from '@/components/common/PostList/PostListThumbnail';
import TagList from '@/components/common/Tag/TagList';

import Post from '@/types/Post';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export interface PostListItemProps {
  post: Post;
}

export default function PostListItem(props: PostListItemProps): JSX.Element {
  const { post } = props;
  const { user, createdAt, summary, tags, likes, comments } = post;
  const isAdmin = useMemo<boolean>(
    () => post.user.role === 'ROLE_ADMIN',
    [post.user],
  );

  return (
    <Styled.PostListItem>
      <Styled.Thumbnail>
        <PostListThumbnail {...post} />
      </Styled.Thumbnail>
      <Styled.UserInfo admin={isAdmin}>
        <Styled.UserImage
          src={user.profile.image}
          alt={user.profile.nickname}
          width="18px"
          height="18px"
        />
        <Styled.UserNickname>{user.profile.nickname}</Styled.UserNickname>
        <Styled.CreatedAt>
          {dayjs(createdAt).format(DATE_FORMAT)}
        </Styled.CreatedAt>
      </Styled.UserInfo>
      <Styled.Contents>
        <Styled.Description>{summary}</Styled.Description>
        {tags && <TagList tags={tags} />}
        <Styled.SocialInfo>
          좋아요 {likes}개<Styled.Dot>·</Styled.Dot>
          덧글 {comments.length}개
        </Styled.SocialInfo>
      </Styled.Contents>
    </Styled.PostListItem>
  );
}
