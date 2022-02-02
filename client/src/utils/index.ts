import { Gradation } from '@/types';
import { GRADATIONS } from '@/constants';

export function range(size: number, start?: number): number[] {
  return [...Array(size).keys()].map((i) => i + (start || 0));
}

export function getRandomGradation(): Gradation {
  return GRADATIONS[Math.floor(Math.random() * GRADATIONS.length)];
}

export function isServer(): boolean {
  return typeof window !== 'object';
}

export function limitInputNumber(
  value: string,
  min: number,
  max: number,
): number {
  const result: number = parseInt(value.replace(/[^0-9.]/g, ''));
  if (!result || result < min) {
    return min;
  }
  if (result > max) {
    return max;
  }
  return result;
}
