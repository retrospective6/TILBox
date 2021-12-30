import { daysInMonth } from '@/utils/days';
import { range } from '@/utils';
import DateItem from './DateItem';

export default class DateItems {
  private readonly dates: DateItem[];

  constructor(year: number, month: number) {
    const monthEnd = daysInMonth(year, month);
    this.dates = range(monthEnd, 1)
      .map((date) => new Date(`${year}.${month}.${date}`))
      .map((date) => new DateItem(date));
  }

  setShapes(postDates: number[]): void {
    this.dates.forEach((date) => {
      const initShape = date.isIncluded(postDates) ? 'alone' : 'inactive';
      date.setShape(initShape);
    });

    this.dates.forEach((_, index) => this.considerShape(index));
  }

  considerShape(index: number): void {
    const target = this.dates[index];
    if (target.isInactive()) {
      return;
    }
    const prev = this.dates[index - 1] || new DateItem(new Date());
    const next = this.dates[index + 1] || new DateItem(new Date());
    if (prev.isInactive() && next.isInactive()) {
      return;
    }
    if (prev.isActive() && next.isActive()) {
      return target.setShape('center');
    }
    if (next.isActive()) {
      return target.setShape('left');
    }
    if (prev.isActive()) {
      return target.setShape('right');
    }
  }

  getDates(): DateItem[] {
    return this.dates;
  }
}
