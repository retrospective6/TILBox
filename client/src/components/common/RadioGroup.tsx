import React, { ChangeEvent, useState } from 'react';

import RadioButton, { RadioButtonProps } from '@/components/common/RadioButton';

export interface RadioGroupProps {
  name: string;
  values: Pick<RadioButtonProps, 'value' | 'label'>[];
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
      {values.map(({ value, label }) => (
        <RadioButton
          key={value}
          type="radio"
          value={value}
          name={name}
          label={label}
          checked={selected === value}
          onChange={handleChange}
        />
      ))}
    </>
  );
}
