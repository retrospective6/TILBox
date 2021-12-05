import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface FormProps {
  email: string;
  password: string;
}

export interface LoginModalProps {
  onClose: () => void;
  onSubmit: (props: FormProps) => void;
}

export default function LoginModal(props: LoginModalProps): JSX.Element {
  const { onClose, onSubmit } = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmitValue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <Modal title="이메일 로그인" onClose={onClose}>
      <Form onSubmit={onSubmitValue}>
        <Input
          data-testid="email-input"
          title="이메일"
          width="100%"
          onChange={onChangeEmail}
        />
        <Input
          data-testid="password-input"
          type="password"
          title="비밀번호"
          width="100%"
          onChange={onChangePassword}
        />
        <Button data-testid="submit-button" variant="primary" width="100%">
          로그인
        </Button>
      </Form>
    </Modal>
  );
}

const Form = styled.form`
  input {
    margin-bottom: 8px;
  }
  button {
    margin-top: 16px;
  }
`;
