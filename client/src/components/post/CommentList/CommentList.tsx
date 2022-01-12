import React from 'react';
import * as Styled from './CommentList.styles';

import CommentInput from '@/components/post/CommentList/CommentInput';

import { Comment } from '@/types/Post';

export interface CommentListProps {
  comments: Comment[];
  onSubmit: (value: string) => void;
  onReport: (id: number) => void;
}

export default function CommentList(props: CommentListProps): JSX.Element {
  const { comments, onSubmit, onReport } = props;

  const handleReport = (id: number) => () => {
    onReport(id);
  };

  return (
    <Styled.Container>
      <Styled.CommentsCount>댓글 {comments.length}</Styled.CommentsCount>
      <CommentInput onSubmit={onSubmit} />
      <Styled.CommentList>
        {comments.map((comment) => (
          <Styled.CommentListItem key={comment.id}>
            <Styled.ProfileImgWrapper>
              <Styled.ProfileImg
                src={comment.user.image}
                alt={comment.user.nickname}
                width="34px"
                height="34px"
              />
            </Styled.ProfileImgWrapper>
            <Styled.Comment>
              <Styled.CommentInfo>
                <Styled.Nickname>{comment.user.nickname}</Styled.Nickname>
                <Styled.CreatedAt>{comment.createdAt}</Styled.CreatedAt>
                <Styled.Report type="button" onClick={handleReport(comment.id)}>
                  신고
                </Styled.Report>
              </Styled.CommentInfo>
              <Styled.Content>{comment.content}</Styled.Content>
            </Styled.Comment>
          </Styled.CommentListItem>
        ))}
      </Styled.CommentList>
    </Styled.Container>
  );
}
