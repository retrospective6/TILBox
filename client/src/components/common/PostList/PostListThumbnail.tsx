import React, { useEffect, useState } from 'react';
import * as Styled from './PostListThumbnail.styles';
import { ThumbnailProps } from './PostListThumbnail.styles';
import Post from '@/types/Post';

export type PostListThumbnailProps = Pick<Post, 'title' | 'thumbnail'>;

export default function PostListThumbnail(
  props: PostListThumbnailProps,
): JSX.Element {
  const { title, thumbnail } = props;
  const [imgSrc, setImgSrc] = useState<string>();
  const [gradient, setGradient] = useState<ThumbnailProps>();

  useEffect(() => {
    // TODO: 서버의 thumbnail 제공 방식에 따른 로직 변경 필요
    if (thumbnail.startsWith('http')) {
      setImgSrc(thumbnail);
      return;
    }

    const gradients = thumbnail.split(' ');
    setGradient({
      start: gradients[0],
      end: gradients[1],
    });
  }, [thumbnail]);

  return (
    <Styled.Thumbnail start={gradient?.start} end={gradient?.end}>
      {imgSrc && <Styled.ThumbnailImg src={imgSrc} alt={title} layout="fill" />}
      <Styled.ThumbnailText length={title.length}>{title}</Styled.ThumbnailText>
    </Styled.Thumbnail>
  );
}
