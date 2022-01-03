import React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, EditorProps } from '@toast-ui/react-editor';

export interface ToastEditorProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

export default function ToastEditor(props: ToastEditorProps): JSX.Element {
  return <Editor {...props} ref={props.forwardedRef} />;
}
