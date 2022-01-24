import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import CommentListItem, {
  CommentListItemProps,
} from '@/components/post/CommentList/CommentListItem';

import { Comment } from '@/types/Post';
import { COMMENT } from '@mocks/data/comments';
import { USER } from '@mocks/data/users';

const DEFAULT_ARGS: CommentListItemProps = {
  comment: COMMENT,
  onSubmitNestedComment: jest.fn(),
  onReportComment: jest.fn(),
};

const renderCommentListItem = (
  props: Partial<CommentListItemProps>,
): RenderResult => {
  return render(<CommentListItem {...DEFAULT_ARGS} {...props} />);
};

describe('onReportComment', () => {
  const onReportComment = jest.fn();
  beforeEach(() => {
    onReportComment.mockClear();
  });

  test('신고 클릭 시 comment id와 함께 실행', () => {
    const { getByTestId } = renderCommentListItem({
      comment: COMMENT,
      onReportComment,
    });

    const reportButton = getByTestId('comment-report');
    fireEvent.click(reportButton);

    expect(onReportComment).toBeCalledWith(COMMENT.id);
  });
});

describe('onSubmitNestedComment', () => {
  const onSubmitNestedComment = jest.fn();
  beforeEach(() => {
    onSubmitNestedComment.mockClear();
  });

  test('등록버튼 클릭 시 comment id와 함께 실행', () => {
    const { getByTestId } = renderCommentListItem({
      comment: COMMENT,
      onSubmitNestedComment,
    });

    const value = 'test';

    const textarea = getByTestId('comment-textarea');
    const submitButton = getByTestId('comment-submit-button');

    fireEvent.change(textarea, {
      target: { value },
    });
    fireEvent.click(submitButton);

    expect(onSubmitNestedComment).toBeCalledWith(value, COMMENT.id);
  });
});

describe('답글', () => {
  const nestedComment: Comment = {
    id: 1,
    postId: 0,
    user: USER,
    content: 'nested',
    createdAt: new Date(),
  };
  const comment: Comment = {
    id: 0,
    postId: 0,
    user: USER,
    content: 'test',
    comments: [nestedComment],
    createdAt: new Date(),
  };

  test('기본적으로 렌더링 되지 않음', () => {
    const { getByText } = renderCommentListItem({ comment });
    expect(() => getByText(nestedComment.content)).toThrowError();
  });

  test('답글 보기 클릭 시 출력', () => {
    const { getByTestId, getByText } = renderCommentListItem({ comment });

    const openButton = getByTestId('nested-comment-open');
    fireEvent.click(openButton);

    expect(getByText(nestedComment.content)).toBeInTheDocument();
  });

  test('답글 신고 시 해당 답글 id와 함께 onReport 실행', () => {
    const onReportComment = jest.fn();
    const { getByTestId } = renderCommentListItem({
      comment,
      onReportComment,
    });

    const openButton = getByTestId('nested-comment-open');
    fireEvent.click(openButton);

    const reportButton = getByTestId(
      'nested-comment-report-' + nestedComment.id,
    );
    fireEvent.click(reportButton);

    expect(onReportComment).toBeCalledWith(nestedComment.id);
  });
});
