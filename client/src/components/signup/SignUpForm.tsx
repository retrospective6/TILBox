import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import * as Styled from './SignUpForm.styles';

import ProfileImgSelector from '@/components/signup/ProfileImgSelector';
import TextInput from '@/components/common/TextInput';
import NotificationInput from '@/components/common/NotificationInput';
import Button from '@/components/common/Button';

import apis from '@/apis';
import MESSAGES from '@/constants/messages';
import validators from '@/utils/validators';

interface FormData {
  image: string;
  myTilAddress: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  emailNotificationTime?: string;
}

interface ErrorMessage {
  myTilAddress?: string;
  nickname?: string;
  email?: string;
  password?: string;
  passwordCheck?: string;
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
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});

  const validateAll = () => {
    const targets = (({
      myTilAddress,
      nickname,
      email,
      password,
      passwordCheck,
    }) => ({
      myTilAddress,
      nickname,
      email,
      password,
      passwordCheck,
    }))(formData);

    Object.entries(targets).forEach(([key, value]) =>
      setErrorMessage((prevValues) => ({
        ...prevValues,
        [key]: validators[key](value, formData.password),
      })),
    );
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    validateAll();
    const isNotValid = Object.values(errorMessage).some((error) => !!error);
    if (isNotValid) {
      return;
    }
    const { url } = await apis.images.upload(formData.image);
    await apis.users.signup({ ...formData, image: url });
  };

  const handleSelectImg = (image: string) => {
    setFormData({
      ...formData,
      image,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrorMessage((prevValues) => ({
      ...prevValues,
      [name]: validators[name](value, formData.password),
    }));

    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeNotification = (value?: string) => {
    setFormData({
      ...formData,
      emailNotificationTime: value,
    });
  };

  return (
    <Styled.Form noValidate onSubmit={handleSubmit}>
      <Styled.Title>회원 가입</Styled.Title>
      <ProfileImgSelector onSubmit={handleSelectImg} />
      <Styled.ImgSelectorText>
        프로필 사진은 수정 가능합니다
      </Styled.ImgSelectorText>
      <Styled.InputContainer>
        <TextInput
          data-testid="url-input"
          name="myTilAddress"
          title="My TIL 주소"
          placeholder="www.tilbox/til356list"
          value={formData.myTilAddress}
          message={errorMessage.myTilAddress || MESSAGES.TIL_ADDRESS.DEFAULT}
          state={errorMessage.myTilAddress ? 'error' : 'default'}
          onChange={handleChange}
          required
        />
        <TextInput
          data-testid="nickname-input"
          name="nickname"
          title="닉네임"
          placeholder="당근한개"
          value={formData.nickname}
          message={errorMessage.nickname || MESSAGES.NICKNAME.DEFAULT}
          state={errorMessage.nickname ? 'error' : 'default'}
          onChange={handleChange}
          required
        />
        <TextInput
          data-testid="email-input"
          type="email"
          name="email"
          title="이메일"
          placeholder="test@gogle.com"
          message={errorMessage.email || MESSAGES.EMAIL.DEFAULT}
          state={errorMessage.email ? 'error' : 'default'}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextInput
          data-testid="password-input"
          type="password"
          name="password"
          title="비밀번호"
          placeholder="til365master!"
          message={errorMessage.password || MESSAGES.PASSWORD.DEFAULT}
          state={errorMessage.password ? 'error' : 'default'}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextInput
          data-testid="password-check-input"
          type="password"
          name="passwordCheck"
          title="비밀번호 확인"
          placeholder="til365master!"
          value={formData.passwordCheck}
          message={
            errorMessage.passwordCheck || MESSAGES.PASSWORD_CHECK.DEFAULT
          }
          state={errorMessage.passwordCheck ? 'error' : 'default'}
          onChange={handleChange}
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
