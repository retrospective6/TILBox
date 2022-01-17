import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import RadioGroup, { RadioGroupProps } from '@/components/common/RadioGroup';
import { VISIBLE_LEVELS } from '@/utils/constants';

const DEFAULT_ARGS: RadioGroupProps = {
  name: 'test',
  values: VISIBLE_LEVELS,
  onChange: jest.fn(),
};

const renderRadioGroup = (props: Partial<RadioGroupProps>): RenderResult => {
  return render(<RadioGroup {...DEFAULT_ARGS} {...props} />);
};

test('values 모두 출력', () => {
  const values = VISIBLE_LEVELS;

  const { getByText } = renderRadioGroup({ values });
  values.forEach(({ label }) => getByText(label));
});

test('클릭 시 input checked', () => {
  const values = VISIBLE_LEVELS;
  const { getByLabelText } = renderRadioGroup({ values });

  const radio1 = getByLabelText(values[0].label);
  const radio2 = getByLabelText(values[1].label);
  fireEvent.click(radio1);

  expect(radio1).toBeChecked();

  fireEvent.click(radio2);
  expect(radio2).toBeChecked();
  expect(radio1).not.toBeChecked();
});

describe('onChange 메소드', () => {
  const values = VISIBLE_LEVELS;
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('클릭 시 실행', () => {
    const { getByLabelText } = renderRadioGroup({ values, onChange });

    const radio = getByLabelText(values[0].label);
    fireEvent.click(radio);

    expect(onChange).toBeCalledWith(values[0].value);
  });

  test('같은 거 두번 클릭 시 한 번만 실행', () => {
    const { getByLabelText } = renderRadioGroup({ values, onChange });

    const radio = getByLabelText(values[0].label);
    fireEvent.click(radio);
    fireEvent.click(radio);

    expect(onChange).toBeCalledTimes(1);
  });
});
