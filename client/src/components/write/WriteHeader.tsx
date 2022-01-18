import React from 'react';
import * as Styled from './WriteHeader.styles';

import Link from 'next/link';
import LogoIcon from '@/assets/icon/LogoIcon.svg';
import LogoTitle from '@/assets/icon/LogoTitle.svg';

import { State } from '@/types';

export interface WriteHeaderProps {
  state?: State;
  message?: string;
  onSubmit: () => void;
}

export default function WriteHeader(props: WriteHeaderProps): JSX.Element {
  const { state = 'default', message = '', onSubmit } = props;
  return (
    <Styled.Header>
      <Link href="/" passHref>
        <Styled.Logo>
          <LogoIcon />
          <LogoTitle />
        </Styled.Logo>
      </Link>
      <Styled.InfoText state={state}>{message}</Styled.InfoText>
      <Styled.SubmitButton
        data-testid="write-submit"
        variant={state === 'default' ? 'primary' : 'third'}
        bold
        onClick={onSubmit}
      >
        TIL 등록
      </Styled.SubmitButton>
    </Styled.Header>
  );
}
