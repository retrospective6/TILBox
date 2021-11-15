import React, { ChangeEvent, useRef, useState } from 'react';
import styled from '@emotion/styled';

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
    const files = event.currentTarget.files as FileList;
    if (!files[0]) {
      return;
    }

    const img = URL.createObjectURL(files[0]);
    onSubmit(img);
    setSelectedImg(img);
  };

  return (
    <Container onClick={onClick}>
      <FileInput
        type="file"
        accept="image/*"
        ref={imgInput}
        onChange={onSelectImg}
      />
      {selectedImg ? <SelectedImg src={selectedImg} alt="profile-img" /> : '+'}
    </Container>
  );
}

const Container = styled.button`
  width: 82px;
  height: 82px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: linear-gradient(111.34deg, #3ead17 3.55%, #09abce 113.48%);
  color: white;
  font-size: 28px;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const SelectedImg = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 50%;
  object-fit: cover;
`;
