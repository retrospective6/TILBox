import React, { useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, EditorProps } from '@toast-ui/react-editor';

import apis from '@/apis';

export interface ToastEditorProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

export default function ToastEditor(props: ToastEditorProps): JSX.Element {
  const { forwardedRef } = props;
  useEffect(() => {
    const editor = forwardedRef?.current.getInstance();
    if (!editor) {
      return;
    }
    editor.removeHook('addImageBlobHook');
    editor.addHook('addImageBlobHook', (blob, callback) => {
      (async () => {
        const imageFile = new FormData();
        imageFile.append('imageFile', blob);
        const imageUrl = await apis.images.upload(imageFile);
        callback(imageUrl, 'alt text');
      })();

      return false;
    });
  }, [forwardedRef]);

  return <Editor {...props} ref={forwardedRef} />;
}
