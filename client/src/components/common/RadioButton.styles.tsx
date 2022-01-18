import styled from '@emotion/styled';
import FONT from '@/styles/font';

export const Container = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const RadioButton = styled.input`
  display: none;
`;

export const Label = styled.label`
  margin-left: 10px;
  ${FONT.body3}
  cursor: pointer;
`;
