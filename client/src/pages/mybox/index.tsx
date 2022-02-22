import React, { useEffect } from 'react';

import Layout from '@/components/common/Layout';

import { useRouter } from 'next/router';
import useUser from '@/hooks/queries/user/useUser';
import MyPostList from '@/components/mybox/MyPostList';
import useMyPosts from '@/hooks/queries/post/useMyPosts';
import { classifyPosts } from '@/utils';

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
      {posts &&
        classifyPosts(posts).map(({ year, month, posts }, index) => (
          <MyPostList key={index} posts={posts} month={month} year={year} />
        ))}
      {triggerElement}
    </Layout>
  );
}
