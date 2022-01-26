import { Gradation } from '@/types';
import { GRADATIONS } from '@/constants';

export function range(size: number, start?: number): number[] {
  return [...Array(size).keys()].map((i) => i + (start || 0));
}

export function getRandomGradation(): Gradation {
  return GRADATIONS[Math.floor(Math.random() * GRADATIONS.length)];
}
