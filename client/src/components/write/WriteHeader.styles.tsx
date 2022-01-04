import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import FONT from '@/styles/font';

import Button from '@/components/common/Button';

import { State } from '@/types';

export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 64px;
  align-items: center;
  padding: 0 275px 0 76px;
  white-space: nowrap;
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

interface InfoTextProps {
  state: State;
}

const stateCSS: { [keys in State]: SerializedStyles } = {
  default: css`
    color: #666666;
  `,
  error: css`
    color: #c90909;
  `,
};

export const InfoText = styled.span<InfoTextProps>`
  ${FONT.body2};
  ${({ state = 'default' }) => stateCSS[state]};
`;

export const SubmitButton = styled(Button)`
  margin-left: auto;
`;
