import styled from '@emotion/styled';
import FONT from '@/styles/font';

export const Container = styled.div`
  width: 426px;
  padding: 40px 80px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const Title = styled.span`
  ${FONT.body1};
  color: #000000;
`;

export const Form = styled.form`
  input {
    margin-bottom: 8px;
  }
  button {
    margin-top: 16px;
  }
`;
