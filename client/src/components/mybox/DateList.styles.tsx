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
  day: number;
  shape?: DateShapeType;
}

const shapeCSS: { [keys in DateShapeType]: SerializedStyles } = {
  inactive: css``,
  alone: css`
    width: 20px;
    background: #000000;
    border-radius: 50%;
  `,
  left: css`
    width: 28px;
    background: #000000;
    border-radius: 50% 0 0 50%;
  `,
  center: css`
    width: 36px;
    background: #000000;
    border-radius: 0;
  `,
  right: css`
    width: 28px;
    background: #000000;
    border-radius: 0 50% 50% 0;
  `,
};

export const Date = styled.li<DateProps>`
  position: relative;
  text-align: center;
  color: ${({ day }) => getColor(day)};
  ${({ shape }) =>
    shape !== 'inactive' &&
    css`
      color: #ffffff;
    `};

  &:after {
    content: '';
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    height: 20px;
    ${({ shape }) => shape && shapeCSS[shape]};
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
