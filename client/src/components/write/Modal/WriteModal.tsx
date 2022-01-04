import React, { ChangeEvent, useState } from 'react';
import * as Styled from './WriteModal.styles';

import Modal from '@/components/common/Modal/Modal';
import ImgSelector from '@/components/common/ImgSelector';
import PlusIcon from '@/assets/icon/PlusIcon.svg';

import { THUMBNAIL_GRADIENTS, VISIBLE_LEVELS } from '@/utils/constants';
import { ThumbnailGradient, VisibleLevel } from '@/types/Post';
import TagInput from '@/components/write/Modal/TagInput';
import RadioGroup from '@/components/common/RadioGroup';

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
  const [summary, setSummary] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [visibleLevel, setVisibleLevel] = useState<string>(
    VISIBLE_LEVELS[0].value,
  );

  const handleClickColorSelector = (gradient: ThumbnailGradient) => () => {
    setGradient(gradient);
    setThumbnail(undefined);
  };

  const handleSelectThumbnail = (img: string) => {
    setThumbnail(img);
    setGradient(undefined);
  };

  const handleChangeSummary = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setSummary(value);
  };

  const handleChangeTags = (newTags: string[]) => {
    setTags(newTags);
  };

  const handleChangeVisible = (value: string) => {
    setVisibleLevel(value);
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
            <Styled.Description>
              썸네일에 보이는 요약글을 공백 포함 40자까지 작성할 수 있습니다.
            </Styled.Description>
            <Styled.TextArea value={summary} onChange={handleChangeSummary} />
          </Styled.Cell>
          <Styled.Cell>
            <Styled.Title>Tag</Styled.Title>
            <Styled.Description>띄어쓰기를 통해 구분</Styled.Description>
            <TagInput onChange={handleChangeTags} />
          </Styled.Cell>
          <Styled.Cell>
            <Styled.Title>공개설정</Styled.Title>
            <Styled.VisibleLevelSelector>
              <RadioGroup
                name="visible"
                values={VISIBLE_LEVELS}
                checked={VISIBLE_LEVELS[0].value}
                onChange={handleChangeVisible}
              />
            </Styled.VisibleLevelSelector>
          </Styled.Cell>
        </Styled.Column>
      </Styled.Form>
    </Modal>
  );
}
