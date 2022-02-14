import styled from '@emotion/styled';
import FONT from '@/styles/font';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  ${FONT.title2};
`;

export const ImgSelectorText = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
  ${FONT.caption4};
  color: #888888;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SubmitButtonWrapper = styled.div`
  margin: 24px auto;
`;
