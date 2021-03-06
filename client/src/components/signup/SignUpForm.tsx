import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import * as Styled from './SignUpForm.styles';

import ProfileImgSelector from '@/components/signup/ProfileImgSelector';
import TextInput from '@/components/common/TextInput';
import NotificationInput from '@/components/common/NotificationInput';
import Button from '@/components/common/Button';

import apis from '@/apis';
import { Notification } from '@/types/User';
import MESSAGES from '@/constants/messages';
import validators from '@/utils/validators';

interface FormData {
  image: string;
  myTilAddress: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  notification?: Notification;
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

  const handleChangeNotification = (value?: Notification) => {
    setFormData({
      ...formData,
      notification: value,
    });
  };

  return (
    <Styled.Form noValidate onSubmit={handleSubmit}>
      <Styled.Title>?????? ??????</Styled.Title>
      <ProfileImgSelector onSubmit={handleSelectImg} />
      <Styled.ImgSelectorText>
        ????????? ????????? ?????? ???????????????
      </Styled.ImgSelectorText>
      <Styled.InputContainer>
        <TextInput
          data-testid="url-input"
          name="myTilAddress"
          title="My TIL ??????"
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
          title="?????????"
          placeholder="????????????"
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
          title="?????????"
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
          title="????????????"
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
          title="???????????? ??????"
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
            ???????????? ??????
          </Button>
        </Styled.SubmitButtonWrapper>
      </Styled.InputContainer>
    </Styled.Form>
  );
}
