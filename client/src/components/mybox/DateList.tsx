import React, { useMemo } from 'react';
import * as Styled from './DateList.styles';

import DateItems from './utils/DateItems';

export interface DateListProps {
  year: number;
  month: number;
  postDates: number[];
}

export default function DateList(props: DateListProps): JSX.Element {
  const { year, month, postDates } = props;

  const dateItems = useMemo<DateItems>(
    () => new DateItems(year, month),
    [month, year],
  );
  dateItems.setShapes(postDates);

  return (
    <Styled.DateList>
      {dateItems.getDates().map(({ date, shape }, index) => (
        <Styled.Date key={index} day={date.getDay()} shape={shape}>
          {date.getDate()}
        </Styled.Date>
      ))}
    </Styled.DateList>
  );
}
