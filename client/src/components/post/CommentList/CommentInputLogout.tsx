import React, { useMemo } from 'react';
import * as Styled from './CommentInputLogout.styles';

import Button from '@/components/common/Button';

import { getRandomGradation } from '@/utils';
import { Gradation } from '@/types';

export default function CommentInputLogout(): JSX.Element {
  const gradation = useMemo<Gradation>(() => getRandomGradation(), []);

  return (
    <Styled.Container>
      <Styled.Profile>
        <Styled.DefaultImg gradation={gradation} />
      </Styled.Profile>
      <Styled.LoginLabel>
        <Styled.LoginText>덧글을 남기려면 로그인이 필요합니다</Styled.LoginText>
        <Styled.ButtonWrapper>
          <Button data-testid="login-button" variant="primary" bold>
            로그인
          </Button>
        </Styled.ButtonWrapper>
      </Styled.LoginLabel>
    </Styled.Container>
  );
}
