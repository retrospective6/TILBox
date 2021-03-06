import React from 'react';
import { GetServerSidePropsResult } from 'next';
import styled from '@emotion/styled';

import Layout from '@/components/common/Layout';

import PostList from '@/components/common/PostList/PostList';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';
import apis from '@/apis';
import usePosts from '@/hooks/queries/post/usePosts';

export interface MainPageProps {
  dehydratedState: DehydratedState;
}

export default function MainPage(): JSX.Element {
  const { posts, triggerElement } = usePosts();

  return (
    <Layout>
      <Container>{posts && <PostList type="zigzag" posts={posts} />}</Container>
      {triggerElement}
    </Layout>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<MainPageProps>
> {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery('posts', () =>
    apis.posts.getList({}),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

const Container = styled.div`
  margin-top: 43px;
  padding: 0 88px;
`;
