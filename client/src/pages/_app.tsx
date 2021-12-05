import React, { useState } from 'react';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import SignInModal from '@/components/SignInModal';

function TILApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  const [signInModal, setSignInModal] = useState<boolean>(false);

  const handleSignUp = () => {
    // TODO: 회원가입 버튼 클릭 시 로직
  };

  const handleSignIn = () => {
    setSignInModal(true);
  };

  const handleCloseSignIn = () => {
    setSignInModal(false);
  };

  const handleSubmitSignIn = () => {
    // TODO: 로그인 시 로직
  };

  const handleSearch = () => {
    // TODO: 검색 시 로직
  };

  return (
    <>
      <Header
        active={router.pathname}
        onSignUp={handleSignUp}
        onSignIn={handleSignIn}
        onSearch={handleSearch}
      />
      <Component {...pageProps} />
      {signInModal && (
        <SignInModal
          onClose={handleCloseSignIn}
          onSubmit={handleSubmitSignIn}
        />
      )}
    </>
  );
}
export default TILApp;
