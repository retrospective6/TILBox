import React, { InputHTMLAttributes, useRef } from 'react';
import * as Styled from './RadioButton.styles';

import Unchecked from '@/assets/icon/Radio.svg';
import Checked from '@/assets/icon/RadioChecked.svg';

export interface RadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
}

export default function RadioButton(props: RadioButtonProps): JSX.Element {
  const { checked, name, value, label } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <Styled.Container onClick={handleClick}>
      {checked ? <Checked /> : <Unchecked />}
      <Styled.Label>
        <Styled.RadioButton
          {...props}
          checked={undefined}
          type="radio"
          value={value}
          name={name}
          defaultChecked={checked}
          ref={inputRef}
        />
        {label}
      </Styled.Label>
    </Styled.Container>
  );
}
