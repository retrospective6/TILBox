import React from 'react';
import * as Styled from './Modal.styles';

import { Portal } from 'next/dist/client/portal';
import useNoScroll from '@/hooks/useNoScroll';

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal(props: ModalProps): JSX.Element {
  const { children, onClose } = props;
  useNoScroll();

  return (
    <Portal type="modal-root">
      <Styled.Wrapper onClick={onClose} data-testid="modal-wrapper">
        <Styled.Container
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          data-testid="modal-container"
        >
          {children}
        </Styled.Container>
      </Styled.Wrapper>
    </Portal>
  );
}
