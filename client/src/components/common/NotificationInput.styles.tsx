import styled from '@emotion/styled';
import FONT from '@/styles/font';

export const Title = styled.span`
  margin-right: 8px;
  ${FONT.caption1};
`;

export const Description = styled.span`
  ${FONT.caption4};
  color: #666666;
`;

export const InputContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  ${FONT.caption2};
`;

export const TimeInputContainer = styled.div`
  width: 38px;
  height: 18px;
  padding: 2px;
  display: flex;
  justify-content: space-around;
  background: #f3f3f3;
  border-radius: 4px;
`;

export const TimeInput = styled.input`
  width: 12px;
  background: transparent;
  border: none;
  text-align: right;
`;
