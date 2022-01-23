import React, { useEffect } from 'react';
import * as Styled from './Modal.styles';

import { Portal } from 'next/dist/client/portal';

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal(props: ModalProps): JSX.Element {
  const { children, onClose } = props;

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

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
