import React, { useMemo } from 'react';
import * as Styled from '@/components/mybox/DateList.styles';

import DateListItem from '@/components/mybox/DateListItem';

import { daysInMonth } from '@/utils/days';
import { range } from '@/utils';

export interface DayListProps {
  year: number;
  month: number;
}

export default function DateList(props: DayListProps): JSX.Element {
  const { month, year } = props;
  const dates = useMemo<number[]>(() => {
    const monthEnd = daysInMonth(year, month);
    return range(monthEnd, 1);
  }, [month, year]);

  return (
    <Styled.DateList>
      {dates.map((date) => (
        <DateListItem
          key={`${year}.${month}.${date}`}
          year={year}
          month={month}
          date={date}
        />
      ))}
    </Styled.DateList>
  );
}
