import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button', () => {
  test('render label', () => {
    const label = 'hello world';
    const { getByText } = render(<Button label={label} />);
    getByText(label);
  });
});
