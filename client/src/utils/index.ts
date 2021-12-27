export function range(size: number, start?: number) {
  return [...Array(size).keys()].map((i) => i + (start || 0));
}
