import React, { useEffect, useState } from 'react';
import * as Styled from './PostListThumbnail.styles';
import Image from 'next/image';
import { ThumbnailProps } from './PostListThumbnail.styles';
import Post from '@/types/Post';

export type PostThumbnailProps = Pick<Post, 'title' | 'thumbnail'>;

export default function PostListThumbnail(
  props: PostThumbnailProps,
): JSX.Element {
  const { title, thumbnail } = props;
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [thumbnailText, setThumbnailText] = useState<string>('');
  const [gradient, setGradient] = useState<ThumbnailProps>();

  useEffect(() => {
    const src = thumbnail.startsWith('http') ? thumbnail : null;
    if (src) {
      setImgSrc(src);
      return;
    }

    const text =
      title.length <= 20 ? title : title.substring(0, 20).concat('...');
    setThumbnailText(text);

    const gradients = thumbnail.split(' ');
    setGradient({
      start: gradients[0],
      end: gradients[1],
    });
  }, [imgSrc, thumbnail, title]);

  return (
    <Styled.Thumbnail start={gradient?.start} end={gradient?.end}>
      {imgSrc ? (
        <Image src={imgSrc} alt={title} layout="fill" />
      ) : (
        <Styled.ThumbnailText length={title.length}>
          {thumbnailText}
        </Styled.ThumbnailText>
      )}
    </Styled.Thumbnail>
  );
}
