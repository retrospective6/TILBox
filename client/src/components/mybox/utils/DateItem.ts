import { DateShapeType } from '../DateList.styles';

export default class DateItem {
  public date: Date;
  public shape: DateShapeType;

  constructor(date: Date) {
    this.date = date;
    this.shape = 'inactive';
  }

  isInactive(): boolean {
    return this.shape === 'inactive';
  }

  isActive(): boolean {
    return this.shape !== 'inactive';
  }

  isIncluded(dates: number[]) {
    return dates.includes(this.date.getDate());
  }

  setShape(shape: DateShapeType): void {
    this.shape = shape;
  }
}
