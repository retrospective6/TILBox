import React, { useEffect, useState } from 'react';
import * as Styled from './PostListThumbnail.styles';
import { ThumbnailProps } from './PostListThumbnail.styles';
import Post from '@/types/Post';

export type PostListThumbnailProps = Pick<Post, 'title' | 'thumbnail'>;

export default function PostListThumbnail(
  props: PostListThumbnailProps,
): JSX.Element {
  const { title, thumbnail } = props;
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [thumbnailText, setThumbnailText] = useState<string>('');
  const [gradient, setGradient] = useState<ThumbnailProps>();

  useEffect(() => {
    const text =
      title.length <= 20 ? title : title.substring(0, 20).concat('...');
    setThumbnailText(text);

    const src = thumbnail.startsWith('http') ? thumbnail : null;

    if (src) {
      setImgSrc(src);
    }

    const gradients = thumbnail.split(' ');
    setGradient({
      start: gradients[0],
      end: gradients[1],
    });
  }, [imgSrc, thumbnail, title]);

  return (
    <Styled.Thumbnail start={gradient?.start} end={gradient?.end}>
      {imgSrc && <Styled.ThumbnailImg src={imgSrc} alt={title} layout="fill" />}
      <Styled.ThumbnailText length={title.length}>
        {thumbnailText}
      </Styled.ThumbnailText>
    </Styled.Thumbnail>
  );
}
