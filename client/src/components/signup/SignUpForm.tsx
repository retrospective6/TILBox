import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import * as Styled from './SignUpForm.styles';

import TextInput from '@/components/common/TextInput';
import Button from '@/components/common/Button';
import NotificationInput from '@/components/common/NotificationInput';

import apis from '@/apis';
import { Notification } from '@/types/User';
import ProfileImgSelector from '@/components/signup/ProfileImgSelector';

interface FormData {
  image: string;
  myTilAddress: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  notification?: Notification;
}

export default function SignUpForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    image: '',
    myTilAddress: '',
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await apis.users.signup(formData);
  };

  const handleSelectImg = (image: string) => {
    setFormData({
      ...formData,
      image,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeNotification = (value?: Notification) => {
    setFormData({
      ...formData,
      notification: value,
    });
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Title>회원 가입</Styled.Title>
      <ProfileImgSelector onSubmit={handleSelectImg} />
      <Styled.ImgSelectorText>
        프로필 사진은 수정 가능합니다
      </Styled.ImgSelectorText>
      <Styled.InputContainer>
        <TextInput
          data-testid="url-input"
          title="My TIL 주소"
          message="숫자, 영어로 나만의 TIL 주소를 만들 수 있습니다"
          placeholder="www.tilbox/til356list"
          value={formData.myTilAddress}
          onChange={handleChange}
          name="myTilAddress"
          required
        />
        <TextInput
          data-testid="nickname-input"
          title="닉네임"
          message="2자 이상 8자 이하로 입력해주세요"
          placeholder="당근한개"
          value={formData.nickname}
          onChange={handleChange}
          name="nickname"
          required
        />
        <TextInput
          data-testid="email-input"
          title="이메일"
          message="로그인과 알림 메일을 받을 이메일입니다"
          placeholder="test@gogle.com"
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          required
        />
        <TextInput
          data-testid="password-input"
          title="비밀번호"
          message="숫자, 영문, 특수문자를 포함해 8자 이상 입력해주세요"
          placeholder="til365master!"
          type="password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          required
        />
        <TextInput
          data-testid="password-check-input"
          title="비밀번호 확인"
          message="비밀번호를 다시 입력해주세요"
          placeholder="til365master!"
          type="password"
          value={formData.passwordCheck}
          onChange={handleChange}
          name="passwordCheck"
          required
        />
        <NotificationInput onChange={handleChangeNotification} />
        <Styled.SubmitButtonWrapper>
          <Button
            type="submit"
            width="105px"
            size="small"
            variant="primary"
            bold
          >
            회원가입 완료
          </Button>
        </Styled.SubmitButtonWrapper>
      </Styled.InputContainer>
    </Styled.Form>
  );
}
