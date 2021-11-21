import React from 'react';
import '@/styles/global.css';
import type { AppProps } from 'next/app';

function TILApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default TILApp;
