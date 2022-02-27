import React from 'react';
import styled from '@emotion/styled';

import Link, { LinkProps } from 'next/link';
import Button, { ButtonProps } from '@/components/common/Button';

export type LinkButtonProps = LinkProps & ButtonProps;

export default function LinkButton(props: LinkButtonProps): JSX.Element {
  const { width, children } = props;
  return (
    <Link {...props} passHref>
      <Wrapper width={width}>
        <Button {...props}>{children}</Button>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.a<{ width?: string }>`
  width: ${({ width }) => (width ? width : 'auto')};
`;
