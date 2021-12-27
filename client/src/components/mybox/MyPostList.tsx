import React, { useMemo } from 'react';
import * as Styled from './MyPostList.styles';
import PostListItem from '@/components/common/PostList/PostListItem';
import Post from '@/types/Post';
import { daysInMonth } from '@/utils/days';
import { range } from '@/utils';

export interface PostListProps {
  posts: Post[];
  month: number;
  year: number;
}

export default function MyPostList(props: PostListProps): JSX.Element {
  const { posts, month, year } = props;
  const days = useMemo<number[]>(() => {
    const monthEnd = daysInMonth(year, month);
    return range(monthEnd, 1);
  }, [month, year]);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Month>
          {month}월({posts.length}개)
        </Styled.Month>
        <Styled.Days>
          {days.map((day) => (
            <Styled.Day
              key={`${year}.${month}.${day}`}
              day={new Date(`${year}.${month}.${day}`).getDay()}
            >
              {day}
            </Styled.Day>
          ))}
        </Styled.Days>
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
