import React, { useRef, useState, ChangeEvent } from 'react';
import * as Styled from './PostEditor.styles';

import { Editor } from '@toast-ui/react-editor';
import EditorWithForwardedRef from '@/components/write/EditorWithForwardedRef';

export interface PostEditorProps {
  title?: string;
  content?: string;
  onChange: (title: string, content: string) => void;
}

export default function PostEditor(props: PostEditorProps): JSX.Element {
  const { onChange } = props;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const editorRef = useRef<Editor>(null);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleChangeContent = () => {
    if (!editorRef.current) {
      return;
    }

    const editor = editorRef.current.getInstance();
    setContent(editor.getMarkdown());
  };

  const handleBlur = () => {
    onChange(title, content);
  };

  return (
    <>
      <Styled.Input
        data-testid="title-input"
        value={title}
        onChange={handleChangeTitle}
        onBlur={handleBlur}
      />
      <EditorWithForwardedRef
        height="80vh"
        initialValue={content}
        initialEditType="markdown"
        previewStyle="vertical"
        onChange={handleChangeContent}
        onBlur={handleBlur}
        ref={editorRef}
      />
    </>
  );
}
