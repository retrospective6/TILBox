import styled from '@emotion/styled';
import FONT from '@/styles/font';

export const DateList = styled.ul`
  display: flex;
  ${FONT.body4}
`;

interface DateProps {
  day: number;
}

export const Date = styled.li<DateProps>`
  margin-left: 16px;
  color: ${({ day }) => getColor(day)};
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
