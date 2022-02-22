import { UseInfiniteQueryOptions } from 'react-query';
import { AxiosError } from 'axios';
import Post from '@/types/Post';
import apis from '@/apis';
import useInfiniteScrollQuery, {
  UseInfiniteScrollQueryResult,
} from '@/hooks/useInfiniteScrollQuery';

export type UsePostsResult = UseInfiniteScrollQueryResult<
  Post[],
  AxiosError
> & {
  posts?: Post[];
};

export default function usePosts(
  options?: UseInfiniteQueryOptions<Post[], AxiosError>,
): UsePostsResult {
  const result = useInfiniteScrollQuery<Post[], AxiosError>(
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
