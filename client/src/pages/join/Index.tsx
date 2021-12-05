import React from 'react';
import ImgSelector from '@/components/ImgSelector';
import Form from '@/components/join/form/Form';
import * as Styled from '@/pages/join/Index.styles';

export default function Index(): JSX.Element {
  const onImgSubmit = () => {
    return 0;
  };

  return (
    <>
      <Styled.Title>회원가입</Styled.Title>
      <ImgSelector onSubmit={onImgSubmit} />
      <p>프로필 사진은 수정 가능합니다.</p>
      <Form />
    </>
  );
}
