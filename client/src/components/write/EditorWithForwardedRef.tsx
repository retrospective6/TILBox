import React, { ForwardedRef, forwardRef } from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';

import dynamic from 'next/dynamic';
import { ToastEditorProps } from '@/components/write/ToastEditor';
const ToastEditor = dynamic<ToastEditorProps>(() => import('./ToastEditor'), {
  ssr: false,
});

export default forwardRef<Editor, EditorProps>(function EditorWithForwardedRef(
  props: ToastEditorProps,
  ref: ForwardedRef<Editor>,
): JSX.Element {
  return (
    <ToastEditor
      {...props}
      forwardedRef={ref as React.MutableRefObject<Editor>}
    />
  );
});
