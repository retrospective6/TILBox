import { range } from '@/utils';

describe('range', () => {
  test.each([
    [10, 0],
    [10, 1],
    [31, 1],
  ])('return numbers array with size %d, start %d', (size, start) => {
    const result = range(size, start);
    expect(result).toHaveLength(size);
    expect(result[0]).toEqual(start);
  });
});
