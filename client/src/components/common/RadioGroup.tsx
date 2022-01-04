import React, { ChangeEvent, useState } from 'react';

import RadioButton from '@/components/common/RadioButton';

export interface RadioGroupProps {
  name: string;
  values: string[];
  checked?: string;
  onChange: (value: string) => void;
}

export default function RadioGroup(props: RadioGroupProps): JSX.Element {
  const { name, values, checked, onChange } = props;
  const [selected, setSelected] = useState<string>(checked || '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === selected) {
      return;
    }
    setSelected(value);
    onChange(value);
  };

  return (
    <>
      {values.map((value) => (
        <RadioButton
          key={value}
          type="radio"
          value={value}
          name={name}
          checked={selected === value}
          onChange={handleChange}
        />
      ))}
    </>
  );
}
