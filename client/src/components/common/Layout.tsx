import React, { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

import Header from '@/components/common/Header/Header';
import LoginModal, {
  LoginFormProps,
} from '@/components/common/Modal/LoginModal';

import apis from '@/apis';
import useProfile from '@/hooks/useProfile';
import auth from '@/utils/auth';

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;
  const router = useRouter();
  const [loginModal, setLoginModal] = useState<boolean>(false);

  const { profile } = useProfile();

  const handleSignUp = () => {
    // TODO: 회원가입 버튼 클릭 시 로직
  };

  const handleOpenLoginModal = () => {
    setLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModal(false);
  };

  const handleLogin = async (values: LoginFormProps) => {
    try {
      const { accessToken } = await apis.users.login(values);
      if (accessToken) {
        auth.set(accessToken);
        await router.reload();
      }
    } catch (error) {
      return;
    }
  };

  const handleSearch = () => {
    // TODO: 검색 시 로직
  };

  const handleWrite = () => {
    // TODO: 글 작성 시 로직
  };

  return (
    <>
      <Header
        active={router.pathname}
        onSignUp={handleSignUp}
        onLogin={handleOpenLoginModal}
        onSearch={handleSearch}
        onWrite={handleWrite}
        profile={profile}
      />
      {children}
      {loginModal && (
        <LoginModal onClose={handleCloseLoginModal} onSubmit={handleLogin} />
      )}
    </>
  );
}
