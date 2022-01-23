import React from 'react';
import * as Styled from './Header.styles';

import Link from 'next/link';
import SearchInput from '@/components/common/Header/SearchInput';
import Button from '@/components/common/Button';
import LogoIcon from '@/assets/icon/LogoIcon.svg';
import LogoTitle from '@/assets/icon/LogoTitle.svg';

import { NAV_ITEMS } from '@/constants/routers';
import User from '@/types/User';

export interface HeaderProps {
  active: string;
  user?: User;
  onLogin: () => void;
  onWrite: () => void;
  onSearch: (value: string) => void;
}

export default function Header(props: HeaderProps): JSX.Element {
  const { active, user, onLogin, onWrite, onSearch } = props;

  return (
    <Styled.Header>
      <Styled.Navbar>
        <Link href="/" passHref>
          <Styled.Logo data-testid="logo">
            <LogoIcon />
            <LogoTitle />
          </Styled.Logo>
        </Link>
        {NAV_ITEMS.map((item) => (
          <Styled.NavItem
            key={item.testId}
            data-testid={item.testId}
            active={active === item.href}
          >
            <Link href={item.href}>{item.title}</Link>
          </Styled.NavItem>
        ))}
        <SearchInput
          onSearch={onSearch}
          placeholder={
            '아이디, 닉네임, 태그, 텍스트와 본문을 검색해볼 수 있습니다'
          }
        />
      </Styled.Navbar>
      <Styled.UserInfo>
        {user ? (
          <>
            <Styled.UserImage src={user.image} alt="user-image" />
            <Styled.UserNickname data-testid="user-nickname">
              {user.nickname} 님
            </Styled.UserNickname>
            <Button data-testid="write-button" onClick={onWrite}>
              글쓰기
            </Button>
          </>
        ) : (
          <>
            <Link href="/signup" passHref>
              <Styled.UserInfoItem data-testid="sign-up">
                회원가입
              </Styled.UserInfoItem>
            </Link>
            <Styled.UserInfoItem data-testid="login" onClick={onLogin}>
              로그인
            </Styled.UserInfoItem>
          </>
        )}
      </Styled.UserInfo>
    </Styled.Header>
  );
}
