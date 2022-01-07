import React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer, ViewerProps } from '@toast-ui/react-editor';

export default function ToastViewer(props: ViewerProps): JSX.Element {
  return <Viewer {...props} />;
}
