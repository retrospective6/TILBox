import styled from '@emotion/styled';
import { css } from '@emotion/react';
import FONT from '@/styles/font';

interface ContainerProps {
  active: boolean;
}

const activeCSS = css`
  width: 42.5vw;
  padding: 0 12px;
  border: 1px solid #cdcdcd;
  background-color: #ffffff;
  span:first-of-type {
    visibility: hidden;
  }
  input {
    visibility: visible;
    width: 37.5vw;
  }
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 60px;
  height: 30px;
  margin: 18px;
  border: 0 solid #cdcdcd;
  border-radius: 8px;
  background-color: transparent;
  align-items: center;
  transition: width 0.35s;

  input {
    visibility: hidden;
    width: 0;
    padding: 0;
    margin: 0;
    transition: width 0.35s;
  }
  &:hover,
  &:focus,
  &:focus-within {
    ${activeCSS}
  }
  ${({ active }) => active && activeCSS}
`;

export const Text = styled.span`
  position: absolute;
  white-space: nowrap;
`;

export const Input = styled.input`
  position: absolute;
  flex: 1;
  border: none;
  outline: none;
  ${FONT.body4};

  ::placeholder {
    color: #cdcdcd;
  }
`;

export const Icon = styled.span`
  margin-top: 4px;
  margin-left: auto;
  cursor: pointer;
`;
