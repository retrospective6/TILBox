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
): string {
  let result: string = value.replace(/[^0-9.]/g, '');
  if (!result || parseInt(result) < min) {
    result = min.toString();
  }
  if (parseInt(result) > max) {
    result = max.toString();
  }
  return result;
}
