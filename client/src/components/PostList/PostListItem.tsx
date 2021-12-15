import React from 'react';
import * as Styled from './PostListItem.styles';
import Post from '@/types/Post';
import PostListThumbnail from '@/components/PostList/PostListThumbnail';

export interface PostListItemProps {
  post: Post;
}

export default function PostListItem(props: PostListItemProps): JSX.Element {
  const { post } = props;

  return (
    <Styled.PostListItem>
      <Styled.Thumbnail>
        <PostListThumbnail {...post} />
      </Styled.Thumbnail>
      <Styled.UserInfo>
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
        {post.tags && (
          <Styled.TagList>
            {post.tags.map((tag, index) => (
              <Styled.TagListItem key={index}>{tag}</Styled.TagListItem>
            ))}
          </Styled.TagList>
        )}
        <Styled.SocialInfo>
          좋아요 {post.likes}개<Styled.Dot>·</Styled.Dot>
          덧글 {post.comments}개
        </Styled.SocialInfo>
      </Styled.Contents>
    </Styled.PostListItem>
  );
}
