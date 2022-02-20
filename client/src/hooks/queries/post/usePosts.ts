import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from 'react-query';
import { AxiosError } from 'axios';
import Post from '@/types/Post';
import apis from '@/apis';

export type UseUserResult = UseInfiniteQueryResult<Post[], AxiosError> & {
  postPage?: InfiniteData<Post[]>;
};

export default function usePosts(
  options?: UseInfiniteQueryOptions<Post[], AxiosError>,
): UseUserResult {
  const result = useInfiniteQuery<Post[], AxiosError>(
    'posts',
    ({ pageParam = 0 }) => apis.posts.getList({ lastPostId: pageParam }),
    {
      getNextPageParam(prevData: Post[]): number {
        const lastPost = prevData[prevData.length - 1];
        return lastPost.id;
      },
      ...options,
    },
  );

  return {
    postPage: result.data,
    ...result,
  };
}
