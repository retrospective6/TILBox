import React from 'react';
import ImgSelector from '@/components/ImgSelector';
import Form from '@/components/signUp/form/Form';
import * as Styled from '@/pages/signUp/index.styles';

export default function Index(): JSX.Element {
  const onImgSubmit = () => {
    return 0;
  };

  return (
    <Styled.Container>
      <Styled.Title>회원가입</Styled.Title>
      <Styled.ProfileWrap>
        <ImgSelector onSubmit={onImgSubmit} />
        <p>프로필 사진은 수정 가능합니다.</p>
      </Styled.ProfileWrap>
      <Form />
    </Styled.Container>
  );
}
