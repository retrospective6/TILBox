import React from 'react';
import * as Styled from './CommentList.styles';

import CommentInput from './CommentInput';
import CommentListItem from './CommentListItem';

import { Comment } from '@/types/Post';

export interface CommentListProps {
  comments: Comment[];
  onSubmit: (value: string, commentId?: number) => void;
  onReport: (id: number) => void;
}

export default function CommentList(props: CommentListProps): JSX.Element {
  const { comments, onSubmit, onReport } = props;

  return (
    <Styled.Container>
      <Styled.CommentsCount>댓글 {comments.length}</Styled.CommentsCount>
      <CommentInput onSubmit={onSubmit} />
      <Styled.CommentList>
        {comments.map((comment) => (
          <CommentListItem
            key={comment.id}
            comment={comment}
            onReport={onReport}
            onSubmit={onSubmit}
          />
        ))}
      </Styled.CommentList>
    </Styled.Container>
  );
}
