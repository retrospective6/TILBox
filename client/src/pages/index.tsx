import React from 'react';
import styled from '@emotion/styled';

import Layout from '@/components/common/Layout';
import PostList from '@/components/common/PostList/PostList';

import { dehydrate, QueryClient } from 'react-query';
import apis from '@/apis';

export default function MainPage(): JSX.Element {
  return (
    <Layout>
      <Container>
        <PostList type="zigzag" />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
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
