import React, { useEffect } from 'react';
import {
  QueryFunction,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from 'react-query';
import { useInView } from 'react-intersection-observer';

export type UseInfiniteScrollQueryResult<TData, TError> =
  UseInfiniteQueryResult<TData, TError> & {
    triggerElement: JSX.Element;
  };

export default function useInfiniteScrollQuery<TData, TError>(
  key: string,
  queryFn: QueryFunction<TData>,
  options?: UseInfiniteQueryOptions<TData, TError>,
): UseInfiniteScrollQueryResult<TData, TError> {
  const result = useInfiniteQuery<TData, TError>(key, queryFn, options);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !result.isFetching && result.hasNextPage) {
      result.fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return {
    ...result,
    triggerElement: <div ref={ref} />,
  };
}
