import React from 'react';
import * as Styled from './CommentList.styles';

import CommentInput from './CommentInput';
import CommentListItem from './CommentListItem';

import { Comment } from '@/types/Post';

export interface CommentListProps {
  comments: Comment[];
  onSubmitComment: (value: string, commentId?: number) => void;
  onReportComment: (id: number) => void;
}

export default function CommentList(props: CommentListProps): JSX.Element {
  const { comments, onSubmitComment, onReportComment } = props;

  return (
    <Styled.Container>
      <Styled.CommentsCount>댓글 {comments.length}</Styled.CommentsCount>
      <CommentInput onSubmit={onSubmitComment} />
      <Styled.CommentList>
        {comments.map((comment) => (
          <CommentListItem
            key={comment.id}
            comment={comment}
            onSubmitNestedComment={onSubmitComment}
            onReportComment={onReportComment}
          />
        ))}
      </Styled.CommentList>
    </Styled.Container>
  );
}
