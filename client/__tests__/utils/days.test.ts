import { daysInMonth } from '@/utils/days';

describe('daysInMonth', () => {
  test.each([
    [2021, 12, 31],
    [2021, 11, 30],
    [2020, 2, 29],
  ])('%d.%d have days %d', (year, month, expected) => {
    const result = daysInMonth(year, month);
    expect(result).toEqual(expected);
  });
});
