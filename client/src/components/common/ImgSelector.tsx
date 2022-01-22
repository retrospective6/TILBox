import React, { ChangeEvent, ReactNode, useRef } from 'react';
import styled from '@emotion/styled';
import apis from '@/apis';

export interface ImgSelectorProps {
  children?: ReactNode;
  onSubmit: (img: string) => void;
}

export default function ImgSelector(props: ImgSelectorProps): JSX.Element {
  const { children, onSubmit } = props;

  const imgInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    imgInput.current?.click();
  };

  const handleSelectImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    if (!files[0]) {
      return;
    }

    const imageFile = new FormData();
    imageFile.append('imageFile', files[0]);
    const { url } = await apis.images.upload(imageFile);
    onSubmit(url);
  };

  return (
    <>
      <Button type="button" onClick={handleClick}>
        {children}
      </Button>
      <input
        data-testid="image-input"
        type="file"
        accept="image/*"
        hidden
        ref={imgInput}
        onChange={handleSelectImg}
      />
    </>
  );
}

const Button = styled.button`
  width: 100%;
  height: 100%;
  background: transparent;
`;
