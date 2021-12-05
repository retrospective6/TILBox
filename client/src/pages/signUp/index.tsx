import React from 'react';
import ImgSelector from '@/components/ImgSelector';
import Form from '@/components/signUp/form/Form';
import styled from '@emotion/styled';

export default function Index(): JSX.Element {
  const onImgSubmit = () => {
    return 0;
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <ProfileWrap>
        <ImgSelector onSubmit={onImgSubmit} />
        <p>프로필 사진은 수정 가능합니다.</p>
      </ProfileWrap>
      <Form />
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

export const ProfileWrap = styled.div`
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
