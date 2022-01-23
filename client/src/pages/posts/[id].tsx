import React from 'react';
import { GetServerSidePropsResult } from 'next';

import Layout from '@/components/common/Layout';
import PostViewer from '@/components/post/PostViewer';

import Post from '@/types/Post';
import { POST } from '@mocks/MockData';

export interface PostPageProps {
  post: Post;
}

export default function PostPage(props: PostPageProps): JSX.Element {
  const { post } = props;

  const handleSubmitComment = (
    value: string,
    postId: number,
    commentId?: number,
  ) => {
    return [value, postId, commentId];
  };

  const handleReportComment = (id: number) => {
    return id;
  };

  return (
    <Layout>
      <PostViewer
        post={post}
        onSubmitComment={handleSubmitComment}
        onReportComment={handleReportComment}
      />
    </Layout>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<PostPageProps>
> {
  // TODO: api 연동
  const post = POST;
  return { props: { post } };
}
