import styled from '@emotion/styled';
import FONT from '@/styles/font';

export const Container = styled.div`
  width: 268px;
  height: 34px;
  padding: 8px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 8px;
  background: #f3f3f3;
  ${FONT.body4};
  overflow-y: hidden;
  overflow-x: auto;

  &:focus-within {
    outline: 5px auto -webkit-focus-ring-color;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  min-width: 50%;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

export const Tag = styled.div`
  margin-right: 4px;
  display: flex;
  align-items: center;
`;

export const DeleteButton = styled.button`
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
