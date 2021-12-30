import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import FONT from '@/styles/font';

export const DateList = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: fit-content(20px);
  column-gap: 16px;
  ${FONT.body4};
`;

export type DateShapeType = 'inactive' | 'alone' | 'left' | 'center' | 'right';

interface DateProps {
  date: Date;
  shape?: DateShapeType;
}

export const Date = styled.li<DateProps>`
  position: relative;
  text-align: center;
  color: ${({ date }) => getColor(date.getDay())};
  ${({ shape }) =>
    shape !== 'inactive' &&
    css`
      color: #ffffff;
    `};

  &:after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 20px;
    ${({ date, shape }) => shape && shapeCSS[shape](date.getDate())};
  }
`;

const getColor = (day: number) => {
  if (day !== 0 && day !== 6) {
    return '#000000';
  }
  if (day === 6) {
    return '#0068d5';
  }
  return '#c90909';
};

const shapeCSS: {
  [keys in DateShapeType]: (date: number) => SerializedStyles;
} = {
  inactive: () => css``,
  alone: () => css`
    width: 20px;
    background: #000000;
    border-radius: 50%;
  `,
  left: (date: number) => css`
    width: ${date < 10 ? 24 : date < 20 ? 32 : 36}px;
    background: #000000;
    border-radius: 9px 0 0 9px;
  `,
  center: () => css`
    width: 40px;
    background: #000000;
    border-radius: 0;
  `,
  right: (date: number) => css`
    width: ${date < 10 ? 24 : date < 20 ? 32 : 36}px;
    background: #000000;
    border-radius: 0 9px 9px 0;
  `,
};
