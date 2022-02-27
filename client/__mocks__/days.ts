export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function getToday(): string {
  return `2022년 2월 22일`;
}
