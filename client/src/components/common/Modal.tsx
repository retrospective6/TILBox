import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import CloseIcon from '@/assets/icon/CloseIcon.svg';
import { Portal } from 'next/dist/client/portal';

export interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal(props: ModalProps): JSX.Element {
  const { title, children, onClose } = props;

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
      <Wrapper onClick={onClose} data-testid="modal-wrapper">
        <Container
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          data-testid="modal-container"
        >
          <Header>
            <Title>{title}</Title>
            <CloseButton onClick={onClose} data-testid="modal-close">
              <CloseIcon />
            </CloseButton>
          </Header>
          <Content>{children}</Content>
        </Container>
      </Wrapper>
    </Portal>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: rgba(205, 205, 205, 0.5);
`;

const Container = styled.div`
  width: 426px;
  min-height: 232px;
  margin: auto;
  padding: 40px 80px;
  background-color: #ffffff;
  border: 2px solid #0068d5;
  border-radius: 16px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
`;

const CloseButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
`;

const Content = styled.div`
  margin-top: 30px;
`;
