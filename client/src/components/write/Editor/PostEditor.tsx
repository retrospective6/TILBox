import React, { useRef, useState, ChangeEvent } from 'react';
import * as Styled from './PostEditor.styles';

import { Editor } from '@toast-ui/react-editor';

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
    <Styled.Container>
      <Styled.Input
        data-testid="title-input"
        placeholder="제목"
        value={title}
        onChange={handleChangeTitle}
        onBlur={handleBlur}
      />
      <Styled.Editor
        height="100%"
        initialValue={content}
        initialEditType="markdown"
        previewStyle="vertical"
        onChange={handleChangeContent}
        onBlur={handleBlur}
        ref={editorRef}
      />
    </Styled.Container>
  );
}
