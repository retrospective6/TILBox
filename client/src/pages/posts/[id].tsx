import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import Layout from '@/components/common/Layout';
import PostViewer from '@/components/post/PostViewer';

import Post from '@/types/Post';
import apis from '@/apis';

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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<PostPageProps>> {
  const id = parseInt(context.params?.id as string);
  const post = await apis.posts.get(id);
  return { props: { post } };
}
