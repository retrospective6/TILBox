import React, { useState } from 'react';
import styled from '@emotion/styled';
import PlusIcon from '@/assets/icon/PlusIcon.svg';
import Image from 'next/image';
import ImgSelector from '@/components/common/ImgSelector';

export interface ProfileImgSelectorProps {
  img?: string;
  onSubmit: (img: string) => void;
}

export default function ProfileImgSelector(
  props: ProfileImgSelectorProps,
): JSX.Element {
  const { img, onSubmit } = props;
  const [selectedImg, setSelectedImg] = useState<string | undefined>(img);

  const handleSubmit = (img: string) => {
    setSelectedImg(img);
    onSubmit(img);
  };

  return (
    <Container>
      <ImgSelector onSubmit={handleSubmit}>
        {selectedImg ? (
          <SelectedImg
            src={selectedImg}
            alt="profile-img"
            width="100%"
            height="100%"
          />
        ) : (
          <PlusIcon />
        )}
      </ImgSelector>
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82px;
  height: 82px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: linear-gradient(111.34deg, #3ead17 3.55%, #09abce 113.48%);
`;

const SelectedImg = styled(Image)`
  border: none;
  border-radius: 50%;
  object-fit: cover;
`;
