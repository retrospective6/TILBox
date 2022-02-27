import React from 'react';
import * as Styled from './index.styles';

import { Portal } from 'next/dist/client/portal';
import Link from 'next/link';
import LinkButton from '@/components/common/LinkButton';

import { Profile } from '@/types/User';
import auth from '@/utils/auth';
import { useRouter } from 'next/router';
import useNoScroll from '@/hooks/useNoScroll';

export interface SlideMenuProps {
  profile: Profile;
  onClose: () => void;
}

export default function SlideMenu(props: SlideMenuProps): JSX.Element {
  const { profile, onClose } = props;
  const router = useRouter();
  useNoScroll();

  const handleLogout = () => {
    auth.logout();
    router.reload();
  };

  return (
    <Portal type="slide-menu-root">
      <Styled.Wrapper data-testid="menu-wrapper" onClick={onClose}>
        <Styled.Container>
          <Styled.ProfileImage
            src={profile.image}
            alt={profile.nickname}
            width="82px"
            height="82px"
          />
          <Styled.Nickname>{profile.nickname}</Styled.Nickname>
          <LinkButton href="/write" variant="primary" width="100%">
            TIL 작성
          </LinkButton>
          <Styled.Boundary />
          <Styled.Menu>
            <Styled.MenuItem>
              <Link href="/mybox">My Box</Link>
            </Styled.MenuItem>
            <Styled.MenuItem>
              <Link href="/account">계정 설정</Link>
            </Styled.MenuItem>
            <Styled.MenuItem data-testid="logout" onClick={handleLogout}>
              로그아웃
            </Styled.MenuItem>
          </Styled.Menu>
        </Styled.Container>
      </Styled.Wrapper>
    </Portal>
  );
}