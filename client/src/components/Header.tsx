import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

export default function Header(): JSX.Element {
  return (
    <Container>
      <Navbar>
        <Link href="/">로고</Link>
        <Link href="/">전체글</Link>
        <Link href="/">Timeline</Link>
        <Link href="/">MyBOX</Link>
      </Navbar>
      <UserInfo>
        <div>회원가입</div>
        <div>로그인</div>
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
  padding: 0 76px;
  align-items: center;

  a {
    padding: 0 18px;
    border-right: 1px solid #cdcdcd;
  }
`;

const Navbar = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  display: flex;
  margin-left: auto;
`;
