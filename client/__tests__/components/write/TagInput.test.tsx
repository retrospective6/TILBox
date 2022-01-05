import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import TagInput, { TagInputProps } from '@/components/write/Modal/TagInput';

const DEFAULT_ARGS: TagInputProps = {
  onChange: jest.fn(),
};

const renderTagInput = (props: Partial<TagInputProps>): RenderResult => {
  return render(<TagInput {...DEFAULT_ARGS} {...props} />);
};

test('태그 입력 후 space 시 태그 출력', () => {
  const tag = '태그';
  const { getByTestId, getByText } = renderTagInput({});
  const input = getByTestId('tag-input');

  fireEvent.change(input, {
    target: { value: tag },
  });
  fireEvent.keyUp(input, {
    key: ' ',
  });

  getByText('#' + tag);
});

test('출력된 태그 옆 x 버튼 클릭 시 삭제', () => {
  const tag = '태그';
  const { getByTestId, getByText } = renderTagInput({});
  const input = getByTestId('tag-input');

  fireEvent.change(input, {
    target: { value: tag },
  });
  fireEvent.keyUp(input, {
    key: ' ',
  });

  const tagComponent = getByText('#' + tag);
  const deleteButton = tagComponent.querySelector(
    'button',
  ) as HTMLButtonElement;

  fireEvent.click(deleteButton);
  expect(tagComponent).not.toBeInTheDocument();
});

describe('onChange 메소드', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('내용 입력 후 space 누르면 실행', () => {
    const tag = '태그';
    const { getByTestId } = renderTagInput({ onChange });
    const input = getByTestId('tag-input');

    fireEvent.change(input, {
      target: { value: tag },
    });
    fireEvent.keyUp(input, {
      key: ' ',
    });

    expect(onChange).toBeCalledWith([tag]);
  });

  test('두번 하면 두개 다 전송하며 실행', () => {
    const tags = ['태그', '두번째'];
    const { getByTestId } = renderTagInput({ onChange });
    const input = getByTestId('tag-input');

    tags.forEach((tag) => {
      fireEvent.change(input, {
        target: { value: tag },
      });
      fireEvent.keyUp(input, {
        key: ' ',
      });
    });

    expect(onChange).toBeCalledWith(tags);
  });

  test('내용 없이 space 누르면 실행하지 않음', () => {
    const { getByTestId } = renderTagInput({ onChange });
    const input = getByTestId('tag-input');

    fireEvent.keyUp(input, {
      key: ' ',
    });

    expect(onChange).not.toBeCalled();
  });

  test('동일 태그 있으면 실행하지 않음', () => {
    const tag = '태그';
    const { getByTestId } = renderTagInput({ onChange });
    const input = getByTestId('tag-input');

    fireEvent.change(input, {
      target: { value: tag },
    });
    fireEvent.keyUp(input, {
      key: ' ',
    });

    fireEvent.change(input, {
      target: { value: tag },
    });
    fireEvent.keyUp(input, {
      key: ' ',
    });

    expect(onChange).toBeCalledTimes(1);
  });
});
