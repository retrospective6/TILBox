import React, { ChangeEvent, ReactNode, useRef } from 'react';
import styled from '@emotion/styled';

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

  const handleSelectImg = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files as FileList;
    if (!files[0]) {
      return;
    }

    const imgURL = URL.createObjectURL(files[0]);
    onSubmit(imgURL);
  };

  return (
    <Container onClick={handleClick}>
      <FileInput
        data-testid="image-input"
        type="file"
        accept="image/*"
        ref={imgInput}
        onChange={handleSelectImg}
      />
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: transparent;
`;

const FileInput = styled.input`
  display: none;
`;
