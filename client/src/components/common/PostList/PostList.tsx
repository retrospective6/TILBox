import React, { useEffect } from 'react';
import * as Styled from './PostList.styles';
import { ViewType } from './PostList.styles';

import PostListItem from '@/components/common/PostList/PostListItem';

import usePosts from '@/hooks/queries/post/usePosts';
import { useInView } from 'react-intersection-observer';

export interface PostListProps {
  type?: ViewType;
}

export default function PostList(props: PostListProps): JSX.Element {
  const { type = 'default' } = props;
  const { postPage, fetchNextPage } = usePosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <>
      <Styled.Container type={type}>
        {postPage?.pages.map((posts) =>
          posts.map((post) => (
            <div key={post.id} className="post-list-item">
              <PostListItem post={post} />
            </div>
          )),
        )}
      </Styled.Container>

      <div ref={ref} />
    </>
  );
}
