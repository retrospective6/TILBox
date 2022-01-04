import React from 'react';
import ImgSelector from '@/components/signUp/ImgSelector';
import SignUpForm from '@/components/signUp/form/SignUpForm';
import styled from '@emotion/styled';

export default function SignUpPage(): JSX.Element {
  const onImgSubmit = () => {
    return 0;
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <ProfileWrapper>
        <ImgSelector onSubmit={onImgSubmit} />
        <p>프로필 사진은 수정 가능합니다.</p>
      </ProfileWrapper>
      <SignUpForm />
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
