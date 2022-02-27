import React, { useRef } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/global.css';
import styled from '@emotion/styled';

import { ModalProvider } from '@/hooks/useModal';
import { QueryClient, QueryClientProvider } from 'react-query';

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
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ModalProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ModalProvider>
    </QueryClientProvider>
  );
}

const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
`;
