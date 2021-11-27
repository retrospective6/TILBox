import React, { useEffect } from 'react';
import styled from '@emotion/styled';
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="9" r="9" fill="black" />
                <rect
                  width="10.1425"
                  height="1.44893"
                  transform="matrix(-0.697372 0.71671 -0.697371 -0.71671 12.9297 5.88464)"
                  fill="white"
                />
                <rect
                  width="10.1425"
                  height="1.44893"
                  transform="matrix(0.697372 0.71671 -0.697372 0.71671 6.08081 4.84619)"
                  fill="white"
                />
              </svg>
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
  background-color: #cdcdcd;
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
