import React from 'react';
import Post from '@/types/Post';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { POST } from '@mocks/MockData';
import PostViewer from '@/components/post/PostViewer';

export interface PostPageProps {
  post: Post;
}

export default function PostPage(props: PostPageProps): JSX.Element {
  const { post } = props;
  return <PostViewer post={post} />;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<PostPageProps>> {
  // TODO: api 연동
  const post = POST;
  return { props: { post } };
}
