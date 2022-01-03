import React, { useState } from 'react';
import * as Styled from './WriteModal.styles';

import Modal from '@/components/common/Modal/Modal';
import ImgSelector from '@/components/common/ImgSelector';
import PlusIcon from '@/assets/icon/PlusIcon.svg';

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
  const [thumbnail, setThumbnail] = useState<string>();

  const handleSelectThumbnail = (img: string) => {
    setThumbnail(img);
  };

  return (
    <Modal onClose={onClose}>
      <Styled.Form>
        <Styled.Column>
          <Styled.Title>썸네일 미리보기</Styled.Title>
          <Styled.ThumbnailSelector>
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
