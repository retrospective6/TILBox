import React, { ChangeEvent, useRef, useState } from 'react';
import styled from '@emotion/styled';
import PlusIcon from '@/assets/icon/PlusIcon.svg';
import Image from 'next/image';

export interface ImgSelectorProps {
  img?: string;
  onSubmit: (img: string) => void;
}

export default function ImgSelector(props: ImgSelectorProps): JSX.Element {
  const { img, onSubmit } = props;
  const [selectedImg, setSelectedImg] = useState<string | undefined>(img);

  const imgInput = useRef<HTMLInputElement>(null);

  const onClick = () => {
    imgInput.current?.click();
  };

  const onSelectImg = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files as FileList;
    if (!files[0]) {
      return;
    }

    const imgURL = URL.createObjectURL(files[0]);
    onSubmit(imgURL);
    setSelectedImg(imgURL);
  };

  return (
    <Container onClick={onClick}>
      <FileInput
        data-testid="image-input"
        type="file"
        accept="image/*"
        ref={imgInput}
        onChange={onSelectImg}
      />
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
  color: white;
  font-size: 28px;
`;

const FileInput = styled.input`
  display: none;
`;

const SelectedImg = styled(Image)`
  border: none;
  border-radius: 50%;
  object-fit: cover;
`;
