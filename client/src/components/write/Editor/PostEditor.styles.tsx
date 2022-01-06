import styled from '@emotion/styled';
import FONT from '@/styles/font';

import EditorWithForwardedRef from '@/components/write/Editor/EditorWithForwardedRef';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 30px;
  padding-bottom: 8px;
  border: none;
  border-bottom: 2px solid #f3f3f3;
  outline: none;
  ${FONT.title1};
`;

export const Editor = styled(EditorWithForwardedRef)`
  flex: 1;
`;
