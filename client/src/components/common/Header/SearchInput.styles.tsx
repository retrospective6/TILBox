import styled from '@emotion/styled';
import { css } from '@emotion/react';
import FONT from '@/styles/font';

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

interface ContainerProps {
  active: boolean;
}

const activeCSS = css`
  width: 42.5vw;
  padding: 0 4px 0 12px;
  border: 1px solid #cdcdcd;
  background-color: #ffffff;
  span:first-of-type {
    visibility: hidden;
  }
  input {
    visibility: visible;
    width: 90%;
  }
  @media (max-width: 1280px) {
    width: 60vw;
  }
`;

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 60px;
  border: 0 solid #cdcdcd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: transparent;
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
  font-size: 18px;
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
  margin-left: auto;
  padding-top: 2px;
  cursor: pointer;
`;
