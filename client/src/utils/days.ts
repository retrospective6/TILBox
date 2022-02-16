export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function getToday(): string {
  const now = new Date();
  return `${now.getFullYear()}년 ${now.getMonth()}월 ${now.getDate()}일`;
}
