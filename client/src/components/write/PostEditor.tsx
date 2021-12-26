import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import EditorWithForwardedRef from '@/components/write/EditorWithForwardedRef';

export interface PostEditorProps {
  onSubmit: () => void;
}

export default function PostEditor(props: PostEditorProps): JSX.Element {
  const [value, setValue] = useState<string>('');
  const editorRef = useRef<Editor>(null);

  const handleChange = () => {
    if (!editorRef.current) {
      return;
    }

    const editor = editorRef.current.getInstance();
    setValue(editor.getMarkdown());
  };

  return (
    <EditorWithForwardedRef
      height="80vh"
      initialValue={value}
      initialEditType="markdown"
      previewStyle="vertical"
      onChange={handleChange}
      ref={editorRef}
    />
  );
}
