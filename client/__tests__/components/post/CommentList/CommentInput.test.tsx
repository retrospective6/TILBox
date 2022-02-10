import React from 'react';
import { fireEvent, RenderResult } from '@testing-library/react';
import renderWithProvider from '@tests/testUtils/renderWithProvider';
import CommentInput, {
  CommentInputProps,
} from '@/components/post/CommentList/CommentInput';
import cookie from '@/utils/cookie';
import waitForExpect from 'wait-for-expect';

const DEFAULT_ARGS: CommentInputProps = {
  onSubmit: jest.fn(),
};

const renderCommentInput = (
  props: Partial<CommentInputProps>,
): RenderResult => {
  return renderWithProvider(<CommentInput {...DEFAULT_ARGS} {...props} />);
};

describe('로그인 되어있을 때', () => {
  beforeEach(() => {
    cookie.set('accessToken', 'test');
  });

  test('로그인 버튼 랜더링 안함', () => {
    const { getByTestId } = renderCommentInput({});
    waitForExpect(() =>
      expect(() => getByTestId('login-button')).toThrowError(),
    );
  });

  describe('onSubmit', () => {
    const onSubmit = jest.fn();
    beforeEach(() => {
      onSubmit.mockClear();
      cookie.set('accessToken', 'test');
    });

    test('등록버튼 클릭 시 실행', async () => {
      const { findByTestId } = renderCommentInput({ onSubmit });

      const value = 'test';

      const textarea = await findByTestId('comment-textarea');
      const submitButton = await findByTestId('comment-submit-button');

      fireEvent.change(textarea, {
        target: { value },
      });
      fireEvent.click(submitButton);

      expect(onSubmit).toBeCalledWith(value);
    });

    test('줄바꿈이 9번을 넘게 연속적으로 나올 경우 9번으로 제한', async () => {
      const { findByTestId } = renderCommentInput({ onSubmit });

      const value = 'test\n\n\n\n\n\n\n\n\n\n\nend';

      const textarea = await findByTestId('comment-textarea');
      const submitButton = await findByTestId('comment-submit-button');

      fireEvent.change(textarea, {
        target: { value },
      });
      fireEvent.click(submitButton);

      const expected = 'test\n\n\n\n\n\n\n\n\nend';

      expect(onSubmit).toBeCalledWith(expected);
    });
  });
});

describe('로그인 안되어있을 때', () => {
  test('로그인 버튼 랜더링', () => {
    const { getByTestId } = renderCommentInput({});
    getByTestId('login-button');
  });
});
