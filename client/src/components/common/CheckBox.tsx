import React, {
  InputHTMLAttributes,
  MouseEvent,
  useRef,
  useState,
} from 'react';
import * as Styled from './CheckBox.styles';

import CheckBoxIcon from '@/assets/icon/CheckBox.svg';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function CheckBox(props: CheckBoxProps): JSX.Element {
  const { label, checked } = props;
  const [check, setCheck] = useState<boolean>(checked || false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCheck(!check);
    inputRef.current?.click();
  };

  return (
    <Styled.Container onClick={handleClick}>
      <CheckBoxIcon fill={check ? '#0068D4' : '#666666'} />
      <Styled.Label>
        <Styled.CheckBox
          {...props}
          checked={undefined}
          defaultChecked={check}
          type="checkbox"
          ref={inputRef}
        />
        {label}
      </Styled.Label>
    </Styled.Container>
  );
}
