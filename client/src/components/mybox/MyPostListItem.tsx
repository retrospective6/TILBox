import React from 'react';
import * as Styled from './MyPostListItem.styles';
import PostListItem, {
  PostListItemProps,
} from '@/components/common/PostList/PostListItem';

export interface MyPostListItemProps extends PostListItemProps {
  active?: boolean;
}

export default function MyPostListItem(
  props: MyPostListItemProps,
): JSX.Element {
  const { active = true } = props;
  return (
    <Styled.Container active={active}>
      <PostListItem {...props} />
    </Styled.Container>
  );
}
