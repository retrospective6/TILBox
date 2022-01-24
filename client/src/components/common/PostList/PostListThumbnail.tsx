import React, { useEffect, useState } from 'react';
import * as Styled from './PostListThumbnail.styles';
import Post, { ThumbnailGradation } from '@/types/Post';

export type PostListThumbnailProps = Pick<Post, 'title' | 'thumbnail'>;

export default function PostListThumbnail(
  props: PostListThumbnailProps,
): JSX.Element {
  const { title, thumbnail } = props;
  const [imgSrc, setImgSrc] = useState<string>();
  const [gradation, setGradation] = useState<ThumbnailGradation>();

  useEffect(() => {
    if (thumbnail.type === 'image') {
      setImgSrc(thumbnail.value as string);
      return;
    }

    setGradation(thumbnail.value as ThumbnailGradation);
  }, [thumbnail]);

  return (
    <Styled.Thumbnail start={gradation?.start} end={gradation?.end}>
      {imgSrc && <Styled.ThumbnailImg src={imgSrc} alt={title} layout="fill" />}
      <Styled.ThumbnailText length={title.length}>{title}</Styled.ThumbnailText>
    </Styled.Thumbnail>
  );
}
