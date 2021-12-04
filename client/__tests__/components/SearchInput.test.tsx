import React from 'react';
import SearchInput, { SearchInputProps } from '@/components/SearchInput';
import { fireEvent, render, RenderResult } from '@testing-library/react';

const DEFAULT_ARGS: SearchInputProps = {
  placeholder: 'placeholder',
  onSearch: jest.fn(),
};

const renderSearchInput = (props: Partial<SearchInputProps>): RenderResult => {
  return render(<SearchInput {...DEFAULT_ARGS} {...props} />);
};

describe('with placeholder', () => {
  const placeholder = 'test';

  test('render placeholder', () => {
    const { getByPlaceholderText } = renderSearchInput({ placeholder });
    getByPlaceholderText(placeholder);
  });
});

describe('with onSearch method', () => {
  const onSearch = jest.fn();
  const value = 'test value';

  beforeEach(() => {
    onSearch.mockClear();
  });

  test('run method with input value on key down enter', () => {
    const { getByTestId } = renderSearchInput({ onSearch });
    const input = getByTestId('search-input');

    fireEvent.change(input, { target: { value } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSearch).toBeCalledWith(value);
  });

  test('run method with input value on click icon', () => {
    const { getByTestId } = renderSearchInput({ onSearch });
    const input = getByTestId('search-input');
    const icon = getByTestId('search-icon');

    fireEvent.change(input, { target: { value } });
    fireEvent.click(icon);

    expect(onSearch).toBeCalledWith(value);
  });
});
