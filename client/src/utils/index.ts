import { Gradation } from '@/types';
import { GRADATIONS } from '@/constants';
import Post from '@/types/Post';

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

export async function copyToClipboard(value: string): Promise<void> {
  if (!navigator.clipboard) {
    return;
  }
  return navigator.clipboard.writeText(value);
}

export function classifyPosts(data: Post[]): {
  year: number;
  month: number;
  posts: Post[];
}[] {
  const result: {
    [year in number]: {
      [month in number]: Post[];
    };
  } = {};

  data.forEach((post) => {
    const year = post.createdAt.getFullYear();
    const month = post.createdAt.getMonth() + 1;
    if (!result[year]) {
      result[year] = {};
    }
    if (!result[year][month]) {
      result[year][month] = [];
    }
    result[year][month] = [...result[year][month], post];
  });

  return Object.entries(result)
    .map(([year, monthlyPosts]) =>
      Object.entries(monthlyPosts).map(([month, posts]) => ({
        year: parseInt(year),
        month: parseInt(month),
        posts: sortPosts(posts),
      })),
    )
    .flat()
    .sort((a, b) => b.month - a.month)
    .sort((a, b) => b.year - a.year);
}

function sortPosts(posts: Post[]): Post[] {
  return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
