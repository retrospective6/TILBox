import React from 'react';
import styled from '@emotion/styled';

import SignUpForm from '@/components/signup/form/SignUpForm';
import ProfileImgSelector from '@/components/signup/ProfileImgSelector';
import Layout from '@/components/common/Layout';

export default function SignupPage(): JSX.Element {
  const onImgSubmit = () => {
    return 0;
  };

  return (
    <Layout>
      <Container>
        <Title>회원가입</Title>
        <ProfileWrapper>
          <ProfileImgSelector onSubmit={onImgSubmit} />
          <p>프로필 사진은 수정 가능합니다.</p>
        </ProfileWrapper>
        <SignUpForm />
      </Container>
    </Layout>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 24px;

  p {
    font-size: 8px;
    color: #888888;
    margin-top: 8px;
  }
`;
