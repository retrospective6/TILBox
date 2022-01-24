import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import CommentInput, {
  CommentInputProps,
} from '@/components/post/CommentList/CommentInput';

const DEFAULT_ARGS: CommentInputProps = {
  onSubmit: jest.fn(),
};

const renderCommentInput = (
  props: Partial<CommentInputProps>,
): RenderResult => {
  return render(<CommentInput {...DEFAULT_ARGS} {...props} />);
};

describe('onSubmit', () => {
  const onSubmit = jest.fn();
  beforeEach(() => {
    onSubmit.mockClear();
  });

  test('등록버튼 클릭 시 실행', () => {
    const { getByTestId } = renderCommentInput({ onSubmit });

    const value = 'test';

    const textarea = getByTestId('comment-textarea');
    const submitButton = getByTestId('comment-submit-button');

    fireEvent.change(textarea, {
      target: { value },
    });
    fireEvent.click(submitButton);

    expect(onSubmit).toBeCalledWith(value);
  });

  test('줄바꿈이 9번을 넘게 연속적으로 나올 경우 9번으로 제한', () => {
    const { getByTestId } = renderCommentInput({ onSubmit });

    const value = 'test\n\n\n\n\n\n\n\n\n\n\nend';

    const textarea = getByTestId('comment-textarea');
    const submitButton = getByTestId('comment-submit-button');

    fireEvent.change(textarea, {
      target: { value },
    });
    fireEvent.click(submitButton);

    const expected = 'test\n\n\n\n\n\n\n\n\nend';

    expect(onSubmit).toBeCalledWith(expected);
  });
});
