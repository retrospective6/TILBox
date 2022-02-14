import React, { ChangeEvent, FormEvent, useState } from 'react';
import * as Styled from './AccountEditForm.styles';

import ProfileImgSelector from '@/components/signup/ProfileImgSelector';
import TextInput from '@/components/common/TextInput';
import NotificationInput from '@/components/account/NotificationInput';
import Button from '@/components/common/Button';
import RadioChecked from '@/assets/icon/RadioChecked.svg';
import EditIcon from '@/assets/icon/EditIcon.svg';

import User, { Notification } from '@/types/User';
import { copyToClipboard } from '@/utils';
import useTextInput from '@/hooks/useTextInput';
import rules from '@/utils/rules';
import { State } from '@/types';

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
  const [nicknameMessage, nicknameState, setNicknameInput] = useTextInput(
    '2자 이상 8자 이하로 입력해주세요',
  );
  const [passwordMessage, passwordState, setPasswordInput] = useTextInput(
    '숫자, 영문, 특수문자를 포함해 8자 이상 입력해주세요',
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    const { value } = event.target;
    const state: State = rules.nickname(value) ? 'default' : 'error';
    setNicknameInput({
      message: '2자 이상 8자 이하로 입력해주세요',
      state,
    });
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    const { value } = event.target;
    const state: State = rules.password(value) ? 'default' : 'error';
    setPasswordInput({
      message: '숫자, 영문, 특수문자를 포함해 8자 이상 입력해주세요',
      state,
    });
  };

  const handleSelectImg = (image: string) => {
    setFromData({
      ...formData,
      image,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
          message={nicknameMessage}
          state={nicknameState}
          value={formData.nickname}
          icon={<EditIcon />}
          onChange={handleChangeNickname}
        />
        <TextInput
          name="password"
          type="password"
          title="비밀번호"
          message={passwordMessage}
          state={passwordState}
          icon={<EditIcon />}
          onChange={handleChangePassword}
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
