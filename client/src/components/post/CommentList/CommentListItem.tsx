import React, { useState } from 'react';
import * as Styled from './CommentListItem.styles';

import CommentInput from '@/components/post/CommentList/CommentInput';

import { Comment } from '@/types/Post';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export interface CommentListItemProps {
  comment: Comment;
  onSubmitNestedComment: (value: string, commentId: number) => void;
  onReportComment: (id: number) => void;
}

export default function CommentListItem(
  props: CommentListItemProps,
): JSX.Element {
  const { comment, onSubmitNestedComment, onReportComment } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const handleReport = (id: number) => () => {
    onReportComment(id);
  };

  const handleSubmit = (value: string) => {
    onSubmitNestedComment(value, comment.id);
  };

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClickWrite = () => {
    setIsWriting(!isWriting);
  };

  return (
    <Styled.Container key={comment.id}>
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
          <Styled.CreatedAt>
            {dayjs(comment.createdAt).format(DATE_FORMAT)}
          </Styled.CreatedAt>
          <Styled.Report
            data-testid="comment-report"
            type="button"
            onClick={handleReport(comment.id)}
          >
            신고
          </Styled.Report>
        </Styled.CommentInfo>
        <Styled.Content>{comment.content}</Styled.Content>
        <Styled.NestedCommentInfo>
          <span data-testid="nested-comment-open" onClick={handleClickOpen}>
            <Styled.Triangle rotate={isOpen} />
            답글({comment.comments?.length || 0}개)
          </span>
          ·<span onClick={handleClickWrite}>답글 작성</span>
        </Styled.NestedCommentInfo>
        <Styled.InputWrapper hidden={!isWriting}>
          <CommentInput onSubmit={handleSubmit} />
        </Styled.InputWrapper>
        {isOpen &&
          comment.comments?.map((nestedComment) => (
            <Styled.NestedComment key={nestedComment.id}>
              <Styled.ProfileImgWrapper>
                <Styled.ProfileImg
                  src={nestedComment.user.image}
                  alt={nestedComment.user.nickname}
                  width="34px"
                  height="34px"
                />
              </Styled.ProfileImgWrapper>
              <Styled.Comment>
                <Styled.CommentInfo>
                  <Styled.Nickname>
                    {nestedComment.user.nickname}
                  </Styled.Nickname>
                  <Styled.CreatedAt>
                    {dayjs(nestedComment.createdAt).format(DATE_FORMAT)}
                  </Styled.CreatedAt>
                  <Styled.Report
                    data-testid={`nested-comment-report-${nestedComment.id}`}
                    type="button"
                    onClick={handleReport(nestedComment.id)}
                  >
                    신고
                  </Styled.Report>
                </Styled.CommentInfo>
                <Styled.Content>{nestedComment.content}</Styled.Content>
              </Styled.Comment>
            </Styled.NestedComment>
          ))}
      </Styled.Comment>
    </Styled.Container>
  );
}
