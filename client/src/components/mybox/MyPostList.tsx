import React from 'react';
import * as Styled from './MyPostList.styles';

import PostListItem from '@/components/common/PostList/PostListItem';
import DateList from '@/components/mybox/DateList';

import Post from '@/types/Post';

export interface PostListProps {
  posts: Post[];
  month: number;
  year: number;
}

export default function MyPostList(props: PostListProps): JSX.Element {
  const { posts, month, year } = props;
  const postDates = posts.map((post) => post.createdAt.getDate());

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Month>
          {month}월({posts.length}개)
        </Styled.Month>
        <DateList year={year} month={month} postDates={postDates} />
      </Styled.Header>
      <Styled.PostList>
        {posts.map((post) => (
          <Styled.PostListItem key={post.id} className="post-list-item" active>
            <PostListItem post={post} />
          </Styled.PostListItem>
        ))}
      </Styled.PostList>
    </Styled.Container>
  );
}
