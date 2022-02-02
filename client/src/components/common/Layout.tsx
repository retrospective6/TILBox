import React, { ReactNode } from 'react';

import Header from '@/components/common/Header/Header';

import useProfile from '@/hooks/useProfile';
import { useRouter } from 'next/router';
import useModal from '@/hooks/useModal';

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;
  const router = useRouter();
  const { profile } = useProfile();
  const { openModal } = useModal();

  const handleSignUp = () => {
    // TODO: 회원가입 버튼 클릭 시 로직
  };

  const handleOpenLoginModal = () => {
    openModal('login');
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
    </>
  );
}
