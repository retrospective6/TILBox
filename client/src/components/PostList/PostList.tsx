import React from 'react';
import * as Styled from './PostList.styles';
import Post from '@/types/Post';
import PostListItem from '@/components/PostList/PostListItem';

export interface PostListProps {
  posts: Post[];
  zigzag: boolean;
}

export default function PostList(props: PostListProps): JSX.Element {
  const { posts, zigzag } = props;
  return (
    <Styled.Container zigzag={zigzag}>
      {posts.map((post) => (
        <div key={post.id} className="post-list-item">
          <PostListItem post={post} />
        </div>
      ))}
    </Styled.Container>
  );
}
