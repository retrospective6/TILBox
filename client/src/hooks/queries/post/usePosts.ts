import { UseInfiniteQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import Post from '@/types/Post';
import apis from '@/apis';
import useInfiniteScrollQeury, {
  UseInfiniteScrollQueryResult,
} from '@/hooks/useInfiniteScrollQeury';

export type UseUserResult = UseInfiniteScrollQueryResult<Post[], AxiosError> & {
  posts?: Post[];
};

export default function usePosts(
  options?: UseInfiniteQueryOptions<Post[], AxiosError>,
): UseUserResult {
  const result = useInfiniteScrollQeury<Post[], AxiosError>(
    '/posts',
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
    posts: result.data?.pages.flat(),
    ...result,
  };
}
