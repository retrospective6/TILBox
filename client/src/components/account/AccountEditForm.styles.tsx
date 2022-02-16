import styled from '@emotion/styled';
import FONT from '@/styles/font';

import Copy from '@/assets/icon/CopyIcon.svg';

export const Form = styled.form`
  padding: 36px;
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

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OptionTitle = styled.span`
  ${FONT.caption1};
`;

export const OptionDescription = styled.span`
  margin-left: 8px;
  ${FONT.caption4};
  color: #666666;
`;

export const TILAddress = styled.div`
  width: 268px;
  height: 34px;
  padding: 7px 8px;
  border-radius: 8px;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${FONT.body4};
`;

export const CopyIcon = styled(Copy)`
  cursor: pointer;
`;

export const Email = styled.div`
  width: 268px;
  height: 34px;
  padding: 7px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${FONT.body4};
`;

export const SignOutButton = styled.button`
  display: block;
  margin-left: auto;
  width: 47px;
  height: 18px;
  padding: 2px 6px;
  border-radius: 4px;
  ${FONT.caption2};
  background: #c90909;
  color: #ffffff;
`;

export const SubmitButtonWrapper = styled.div`
  margin: 24px auto;
`;
