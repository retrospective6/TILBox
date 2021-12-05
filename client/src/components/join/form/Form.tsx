import React from 'react';
import Input from '@/components/Input';
import * as Styled from './Form.styles';

export default function Form(): JSX.Element {
  return (
    <Styled.Form>
      <Input
        data-testid="email-input"
        title="My TIL 주소"
        width="100%"
        hint="숫자, 영어를 조합해 나만의 TIL 주소를 만들 수 있습니다"
        placeholder="www.tilbox/til356list"
      />
      <Input
        data-testid="email-input"
        title="닉네임"
        width="100%"
        hint="2자 이상 8자 이하로 입력해주세요"
        placeholder="당근한개"
      />
      <Input
        data-testid="email-input"
        title="이메일"
        width="100%"
        hint="로그인과 알림 메일을 받을 이메일입니다"
        placeholder="test@gogle.com"
      />
      <Input
        data-testid="email-input"
        title="비밀번호"
        width="100%"
        hint="숫자, 영문, 특문(!, @, #, $, %, ^, &, *) 모두 포함 8자 이상 입력해주세요"
        placeholder="til365master!"
      />
      <Input
        data-testid="email-input"
        title="비밀번호 확인"
        width="100%"
        hint="비밀번호를 다시 입력해주세요"
        placeholder="til365master!"
      />
    </Styled.Form>
  );
}
