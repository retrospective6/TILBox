import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import PostEditor, { PostEditorProps } from '@/components/write/Editor/PostEditor';

const DEFAULT_ARGS: PostEditorProps = {
  onChange: jest.fn(),
};

const renderPostEditor = (props: Partial<PostEditorProps>): RenderResult => {
  return render(<PostEditor {...DEFAULT_ARGS} {...props} />);
};

describe('onChange 메소드', () => {
  const onChange = jest.fn();

  const title = '제목';
  test('title input blur 시 실행', async () => {
    const { findByTestId } = renderPostEditor({ onChange });
    const titleInput = await findByTestId('title-input');

    fireEvent.change(titleInput, {
      target: { value: title },
    });
    fireEvent.blur(titleInput);

    expect(onChange).toBeCalledWith(title, '');
  });
});
