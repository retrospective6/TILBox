import React, { useState } from 'react';
import * as Styled from './WriteModal.styles';

import Modal from '@/components/common/Modal/Modal';
import ImgSelector from '@/components/common/ImgSelector';
import PlusIcon from '@/assets/icon/PlusIcon.svg';

import { THUMBNAIL_GRADIENTS } from '@/utils/constants';
import { ThumbnailGradient } from '@/types/Post';

export interface WriteFormProps {
  description: string;
  tags: string[];
  visibleLevel: string;
}

export interface WriteModalProps {
  onClose: () => void;
  onSubmit: (values: WriteFormProps) => void;
}

export default function WriteModal(props: WriteModalProps): JSX.Element {
  const { onClose } = props;
  const [gradient, setGradient] = useState<ThumbnailGradient>();
  const [thumbnail, setThumbnail] = useState<string>();

  const handleClickColorSelector = (gradient: ThumbnailGradient) => () => {
    setGradient(gradient);
    setThumbnail(undefined);
  };

  const handleSelectThumbnail = (img: string) => {
    setThumbnail(img);
    setGradient(undefined);
  };

  return (
    <Modal onClose={onClose}>
      <Styled.Form>
        <Styled.Column>
          <Styled.Title>썸네일 미리보기</Styled.Title>
          <Styled.ColorList>
            <Styled.ColorListText>썸네일 컬러</Styled.ColorListText>
            {THUMBNAIL_GRADIENTS.map((gradient, i) => (
              <Styled.ColorListItem
                key={i}
                {...gradient}
                onClick={handleClickColorSelector(gradient)}
              />
            ))}
          </Styled.ColorList>
          <Styled.ThumbnailSelector gradient={gradient}>
            <ImgSelector onSubmit={handleSelectThumbnail}>
              {thumbnail && (
                <Styled.ThumbnailImage
                  src={thumbnail}
                  alt="thumbnail-img"
                  layout="fill"
                />
              )}
              <Styled.ThumbnailText>
                <Styled.PlusIcon>
                  <PlusIcon />
                </Styled.PlusIcon>
                사진 업로드
              </Styled.ThumbnailText>
            </ImgSelector>
          </Styled.ThumbnailSelector>
        </Styled.Column>
        <Styled.Column>
          <Styled.Cell>
            <Styled.Title>요약글</Styled.Title>
          </Styled.Cell>
          <Styled.Cell>
            <Styled.Title>Tag</Styled.Title>
          </Styled.Cell>
          <Styled.Cell>
            <Styled.Title>공개설정</Styled.Title>
          </Styled.Cell>
        </Styled.Column>
      </Styled.Form>
    </Modal>
  );
}
