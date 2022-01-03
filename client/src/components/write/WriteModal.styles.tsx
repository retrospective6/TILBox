import styled from '@emotion/styled';
import FONT from '@/styles/font';

import Image from 'next/image';

export const Form = styled.form`
  display: flex;
  width: 812px;
  height: 498px;
  padding: 80px 100px;
`;

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Cell = styled.div`
  margin-bottom: 16px;
`;

export const Title = styled.span`
  margin-bottom: 10px;
  ${FONT.title1};
  color: #000000;
`;

export const ThumbnailSelector = styled.div`
  position: relative;
  width: 100%;
  height: 170px;
  background: #000000;
`;

export const ThumbnailImage = styled(Image)`
  opacity: 0.8;
`;

export const ThumbnailText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${FONT.title3};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const PlusIcon = styled.span`
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #006bd4;
`;
