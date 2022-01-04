import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import RadioGroup, { RadioGroupProps } from '@/components/common/RadioGroup';

const DEFAULT_ARGS: RadioGroupProps = {
  name: 'test',
  values: ['a', 'b', 'c'],
  onChange: jest.fn(),
};

const renderRadioGroup = (props: Partial<RadioGroupProps>): RenderResult => {
  return render(<RadioGroup {...DEFAULT_ARGS} {...props} />);
};

test('values 모두 출력', () => {
  const values = ['전체공개', '친구공개', '나만보기'];

  const { getByText } = renderRadioGroup({ values });
  values.forEach((value) => getByText(value));
});

test('클릭 시 input checked', () => {
  const values = ['전체공개', '친구공개', '나만보기'];
  const { getByLabelText } = renderRadioGroup({ values });

  const radio1 = getByLabelText(values[0]);
  const radio2 = getByLabelText(values[1]);
  fireEvent.click(radio1);

  expect(radio1).toBeChecked();

  fireEvent.click(radio2);
  expect(radio2).toBeChecked();
  expect(radio1).not.toBeChecked();
});

describe('onChange 메소드', () => {
  const values = ['전체공개', '친구공개', '나만보기'];
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('클릭 시 실행', () => {
    const { getByLabelText } = renderRadioGroup({ values, onChange });

    const radio = getByLabelText(values[0]);
    fireEvent.click(radio);

    expect(onChange).toBeCalledWith(values[0]);
  });

  test('같은 거 두번 클릭 시 한 번만 실행', () => {
    const { getByLabelText } = renderRadioGroup({ values, onChange });

    const radio = getByLabelText(values[0]);
    fireEvent.click(radio);
    fireEvent.click(radio);

    expect(onChange).toBeCalledTimes(1);
  });
});
