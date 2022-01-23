import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import Input from '@/components/common/TextInput';
import * as Styled from './Form.styles';
import Button from '@/components/common/Button';
import { signup } from '@/api/user.api';

interface Form {
  myTilAddress: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  emailCheck: boolean;
}

export default function SignUpForm(): JSX.Element {
  const [form, setForm] = useState<Form>({
    myTilAddress: '',
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
    emailCheck: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await signup(form);
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Input
        data-testid="url-input"
        title="My TIL 주소"
        width="100%"
        height="34px"
        message="숫자, 영어를 조합해 나만의 TIL 주소를 만들 수 있습니다"
        placeholder="www.tilbox/til356list"
        value={form.myTilAddress}
        onChange={handleChange}
        name="myTilAddress"
        required
      />
      <Input
        data-testid="nickname-input"
        title="닉네임"
        width="100%"
        message="2자 이상 8자 이하로 입력해주세요"
        height="34px"
        placeholder="당근한개"
        value={form.nickname}
        onChange={handleChange}
        name="nickname"
        required
      />
      <Input
        data-testid="email-input"
        title="이메일"
        width="100%"
        message="로그인과 알림 메일을 받을 이메일입니다"
        height="34px"
        placeholder="test@gogle.com"
        type="email"
        value={form.email}
        onChange={handleChange}
        name="email"
        required
      />
      <Input
        data-testid="password-input"
        title="비밀번호"
        width="100%"
        message="숫자, 영문, 특문(!, @, #, $, %, ^, &, *) 모두 포함 8자 이상 입력해주세요"
        placeholder="til365master!"
        type="password"
        value={form.password}
        onChange={handleChange}
        name="password"
        required
      />
      <Input
        data-testid="password-check-input"
        title="비밀번호 확인"
        width="100%"
        height="34px"
        message="비밀번호를 다시 입력해주세요"
        placeholder="til365master!"
        type="password"
        value={form.passwordCheck}
        onChange={handleChange}
        name="passwordCheck"
        required
      />
      <Styled.CheckEmailReception>
        <label>
          <div>
            <span className="title">이메일 수신</span>
            <span className="description">
              정해진 시간에 맞춰 TIL 미작성시 알림 메일이 발신됩니다
            </span>
          </div>
        </label>
        <label className="checkbox-wrap">
          <input name="emailCheck" type="checkbox" />
          <span className="checkbox-desc">이메일 수신 동의</span>
        </label>
      </Styled.CheckEmailReception>

      <Button variant="primary" type="submit" bold>
        회원가입 완료
      </Button>
    </Styled.Form>
  );
}
