import React from 'react';
import * as Styled from './PostList.styles';
import { ViewType } from './PostList.styles';

import PostListItem from '@/components/common/PostList/PostListItem';

import usePosts from '@/hooks/queries/post/usePosts';

export interface PostListProps {
  type?: ViewType;
}

export default function PostList(props: PostListProps): JSX.Element {
  const { type = 'default' } = props;
  const { posts, triggerElement } = usePosts();

  return (
    <>
      <Styled.Container type={type}>
        {posts?.map((post, index) => (
          <div key={index} className="post-list-item">
            <PostListItem post={post} />
          </div>
        ))}
      </Styled.Container>
      {triggerElement}
    </>
  );
}
