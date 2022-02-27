import React, { ReactNode } from 'react';

import Header from '@/components/common/Header/Header';

import useProfile from '@/hooks/queries/user/useProfile';
import { useRouter } from 'next/router';
import useModal from '@/hooks/useModal';
import styled from '@emotion/styled';

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;
  const router = useRouter();
  const { profile } = useProfile();
  const { openModal } = useModal();

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
    <Container>
      <Header
        active={router.pathname}
        onLogin={handleOpenLoginModal}
        onSearch={handleSearch}
        onWrite={handleWrite}
        profile={profile}
      />
      {children}
    </Container>
  );
}

const Container = styled.div`
  // TODO: 반응형 적용 후 제거
  min-width: 1280px;
`;
