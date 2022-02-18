import React, { ChangeEvent, FormEvent, useState } from 'react';
import * as Styled from './AccountEditForm.styles';

import ProfileImgSelector from '@/components/signup/ProfileImgSelector';
import TextInput from '@/components/common/TextInput';
import NotificationInput from '@/components/common/NotificationInput';
import Button from '@/components/common/Button';
import RadioChecked from '@/assets/icon/RadioChecked.svg';
import EditIcon from '@/assets/icon/EditIcon.svg';

import User, { Notification } from '@/types/User';
import { copyToClipboard } from '@/utils';
import MESSAGE from '@/constants/messages';
import validators from '@/utils/validators';

export interface AccountEditFormData {
  image: string;
  nickname: string;
  password: string;
  notification?: Notification;
}

export interface AccountEditFormProps {
  user: User;
  onSubmit: (data: AccountEditFormData) => void;
  onSignOut: () => void;
}

interface ErrorMessage {
  nickname?: string;
  password?: string;
}

export default function AccountEditForm(
  props: AccountEditFormProps,
): JSX.Element {
  const { user, onSubmit, onSignOut } = props;
  const { myTilAddress, email, profile, notification } = user;
  const [formData, setFromData] = useState<AccountEditFormData>({
    image: profile.image,
    nickname: profile.nickname,
    password: '',
    notification,
  });
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isNotValid = Object.values(errorMessage).some((error) => !!error);
    if (isNotValid) {
      return;
    }
    onSubmit(formData);
  };

  const handleSelectImg = (image: string) => {
    setFromData({
      ...formData,
      image,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrorMessage({
      ...errorMessage,
      [name]: validators[name](value, formData.password),
    });

    setFromData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeNotification = (value?: Notification) => {
    setFromData({
      ...formData,
      notification: value,
    });
  };

  const handleClickCopyIcon = async () => {
    await copyToClipboard(`www.tilbox/${myTilAddress}`);
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.Title>계정 설정</Styled.Title>
      <ProfileImgSelector img={profile.image} onSubmit={handleSelectImg} />
      <Styled.ImgSelectorText>
        프로필 사진은 수정 가능합니다
      </Styled.ImgSelectorText>
      <Styled.InputContainer>
        <Styled.OptionContainer>
          <div>
            <Styled.OptionTitle>My TIL 주소</Styled.OptionTitle>
            <Styled.OptionDescription>
              나만의 TIL 주소입니다
            </Styled.OptionDescription>
          </div>
          <Styled.TILAddress>
            www.tilbox/{myTilAddress}
            <Styled.CopyIcon onClick={handleClickCopyIcon} />
          </Styled.TILAddress>
        </Styled.OptionContainer>
        <Styled.OptionContainer>
          <div>
            <Styled.OptionTitle>이메일</Styled.OptionTitle>
            <Styled.OptionDescription>
              로그인과 알림 메일을 받을 이메일입니다
            </Styled.OptionDescription>
          </div>
          <Styled.Email>
            {email}
            <RadioChecked />
          </Styled.Email>
        </Styled.OptionContainer>
        <TextInput
          name="nickname"
          title="닉네임"
          message={errorMessage.nickname || MESSAGE.NICKNAME.DEFAULT}
          state={errorMessage.nickname ? 'error' : 'default'}
          value={formData.nickname}
          icon={<EditIcon />}
          onChange={handleChange}
        />
        <TextInput
          name="password"
          type="password"
          title="비밀번호"
          message={errorMessage.password || MESSAGE.PASSWORD.DEFAULT}
          state={errorMessage.password ? 'error' : 'default'}
          icon={<EditIcon />}
          onChange={handleChange}
        />
        <NotificationInput
          value={notification}
          checked={!!notification}
          onChange={handleChangeNotification}
        />
        <Styled.OptionContainer>
          <div>
            <Styled.OptionTitle>회원탈퇴</Styled.OptionTitle>
            <Styled.OptionDescription>
              계정과 함께 작성한 TIL이 삭제됩니다.
            </Styled.OptionDescription>
            <Styled.SignOutButton type="button" onClick={onSignOut}>
              회원탈퇴
            </Styled.SignOutButton>
          </div>
        </Styled.OptionContainer>
        <Styled.SubmitButtonWrapper>
          <Button
            type="submit"
            width="105px"
            size="small"
            variant="primary"
            bold
          >
            계정 설정 완료
          </Button>
        </Styled.SubmitButtonWrapper>
      </Styled.InputContainer>
    </Styled.Form>
  );
}
