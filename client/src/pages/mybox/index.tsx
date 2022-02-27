import React, { useEffect } from 'react';

import Layout from '@/components/common/Layout';

import { useRouter } from 'next/router';
import useUser from '@/hooks/queries/user/useUser';
import MyPostList from '@/components/mybox/MyPostList';
import useMyPosts from '@/hooks/queries/post/useMyPosts';
import { classifyPosts } from '@/utils';
import styled from '@emotion/styled';

export default function MyBoxPage(): JSX.Element {
  const router = useRouter();
  const { user, loggedOut } = useUser();
  const { posts, triggerElement } = useMyPosts();

  useEffect(() => {
    if (loggedOut) {
      router.push('/');
    }
  }, [user, loggedOut, router]);

  return (
    <Layout>
      <Container>
        {posts &&
          classifyPosts(posts).map(({ year, month, posts: data }, index) => (
            <MyPostList key={index} posts={data} month={month} year={year} />
          ))}
      </Container>
      {triggerElement}
    </Layout>
  );
}

const Container = styled.div`
  margin-top: 50px;
  padding: 0 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 110px;
`;
