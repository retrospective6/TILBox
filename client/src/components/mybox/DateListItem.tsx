import React, { useMemo } from 'react';
import * as Styled from '@/components/mybox/DateList.styles';

export interface DayListItemProps {
  year: number;
  month: number;
  date: number;
}

export default function DateListItem(props: DayListItemProps): JSX.Element {
  const { year, month, date } = props;
  const day = useMemo(
    () => new Date(`${year}.${month}.${date}`).getDay(),
    [year, month, date],
  );

  return <Styled.Date day={day}>{date}</Styled.Date>;
}
