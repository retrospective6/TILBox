import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

export interface HeaderProps {
  onSignUp: () => void;
  onSignIn: () => void;
}

export default function Header(props: HeaderProps): JSX.Element {
  const { onSignUp, onSignIn } = props;

  return (
    <Container>
      <Navbar>
        <Logo data-testid="logo">
          <Link href="/">로고</Link>
        </Logo>
        <NavItem data-testid="main">
          <Link href="/">전체글</Link>
        </NavItem>
        <NavItem data-testid="timeline">
          <Link href="/timeline">Timeline</Link>
        </NavItem>
        <NavItem data-testid="mybox">
          <Link href="/mybox">MyBOX</Link>
        </NavItem>
      </Navbar>
      <UserInfo>
        <UserInfoItem data-testid="sign-up" onClick={onSignUp}>
          회원가입
        </UserInfoItem>
        <UserInfoItem data-testid="sign-in" onClick={onSignIn}>
          로그인
        </UserInfoItem>
      </UserInfo>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  width: 100vw;
  height: 64px;
  background-color: #f3f3f3;
  justify-content: center;
  padding-left: 76px;
  align-items: center;
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 18px;
`;

const Logo = styled.div`
  width: 77px;
`;

const NavItem = styled.div`
  height: 14px;
  padding: 0 18px;
  border-right: 1px solid #cdcdcd;
`;

const UserInfo = styled.div`
  display: flex;
  margin-left: auto;
  width: 12.5%;
  min-width: 140px;
`;

const UserInfoItem = styled.div`
  margin-right: 20px;
  font-size: 12px;
  cursor: pointer;
`;
