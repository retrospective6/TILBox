import { classifyPosts, range } from '@/utils';
import Post from '@/types/Post';
import { POST } from '@mocks/data/posts';

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

describe('classifyPosts', () => {
  test(`
    {
      year: number;
      month: number;
      posts: Post[];
    } 형태로 분류
  `, () => {
    const posts: Post[] = [
      { ...POST, createdAt: new Date('2022.02.27') },
      { ...POST, createdAt: new Date('2022.02.26') },
    ];

    const result = classifyPosts(posts);

    expect(result[0]).toHaveProperty('year', 2022);
    expect(result[0]).toHaveProperty('month', 2);
    expect(result[0]).toHaveProperty('posts', posts);
  });

  test('최근 년도가 앞에 오도록 정렬', () => {
    const posts: Post[] = [
      { ...POST, createdAt: new Date('2020.02.27') },
      { ...POST, createdAt: new Date('2022.02.27') },
      { ...POST, createdAt: new Date('2021.02.27') },
    ];

    const result = classifyPosts(posts);

    expect(result[0]).toHaveProperty('year', 2022);
    expect(result[0]).toHaveProperty('month', 2);
  });

  test('최근 월이 앞에 오도록 정렬', () => {
    const posts: Post[] = [
      { ...POST, createdAt: new Date('2022.01.27') },
      { ...POST, createdAt: new Date('2022.05.27') },
      { ...POST, createdAt: new Date('2022.04.27') },
    ];

    const result = classifyPosts(posts);

    expect(result[0]).toHaveProperty('year', 2022);
    expect(result[0]).toHaveProperty('month', 5);
  });

  test('최근 일자가 앞에 오도록 정렬', () => {
    const posts: Post[] = [
      { ...POST, createdAt: new Date('2022.02.26') },
      { ...POST, createdAt: new Date('2022.02.28') },
      { ...POST, createdAt: new Date('2022.02.27') },
    ];

    const result = classifyPosts(posts);

    expect(result[0].posts[0]).toHaveProperty(
      'createdAt',
      new Date('2022.02.28'),
    );
  });
});
