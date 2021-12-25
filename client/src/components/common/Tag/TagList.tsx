import React from 'react';
import * as Styled from '@/components/common/Tag/TagList.styled';
import Post from '@/types/Post';

export type TagListProps = Required<Pick<Post, 'tags'>>;

export default function TagList(props: TagListProps): JSX.Element {
  const { tags } = props;
  return (
    <Styled.TagList>
      {tags.map((tag, index) => (
        <Styled.TagListItem key={index}>{tag}</Styled.TagListItem>
      ))}
    </Styled.TagList>
  );
}
