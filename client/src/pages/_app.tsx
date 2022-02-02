import React from 'react';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import { ModalProvider } from '@/hooks/useModal';

if (process.env.NODE_ENV === 'development') {
  if (typeof window === 'undefined') {
    (async () => {
      const { server } = await import('@mocks/apis/server');
      server.listen();
    })();
  } else {
    (async () => {
      const { worker } = await import('@mocks/apis/browser');
      worker.start();
    })();
  }
}

export default function TILApp({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return (
    <ModalProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </ModalProvider>
  );
}

const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
`;
