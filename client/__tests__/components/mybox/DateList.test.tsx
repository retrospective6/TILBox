import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import DateList, { DateListProps } from '@/components/mybox/DateList';
import { range } from '@/utils';

const DEFAULT_ARGS: DateListProps = {
  year: 2021,
  month: 12,
  postDates: [2, 10, 11, 12],
};

const renderDateList = (props: Partial<DateListProps>): RenderResult => {
  return render(<DateList {...DEFAULT_ARGS} {...props} />);
};

describe.each([
  [2021, 12, 31],
  [2021, 11, 30],
  [2020, 2, 29],
])('year: %d, month: %d일 때', (year, month, expected) => {
  test('1부터' + expected + '까지의 숫자 모두 랜더링', () => {
    const { getByText } = renderDateList({ year, month });
    range(expected, 1).forEach((i) => getByText(i));
  });
});
