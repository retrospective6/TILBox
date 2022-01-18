export function range(size: number, start?: number): number[] {
  return [...Array(size).keys()].map((i) => i + (start || 0));
}
