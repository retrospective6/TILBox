import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Header, { HeaderProps } from '@/components/Header';
import { NAV_ITEMS } from '@/utils/constants';

const DEFAULT_ARGS: HeaderProps = {
  active: '/',
  onSignUp: jest.fn(),
  onSignIn: jest.fn(),
};

const renderHeader = (props: Partial<HeaderProps> = {}): RenderResult => {
  return render(<Header {...DEFAULT_ARGS} {...props} />);
};

describe('logo', () => {
  test('has a tag with /', () => {
    const { getByTestId } = renderHeader();
    const logoLink = getByTestId('logo').querySelector('a');

    expect(logoLink).toHaveAttribute('href', '/');
  });
});

describe('navbar', () => {
  test('has a tag with /', () => {
    const { getByTestId } = renderHeader();
    const mainLink = getByTestId('main').querySelector('a');

    expect(mainLink).toHaveAttribute('href', '/');
  });

  test('has a tag with /timeline', () => {
    const { getByTestId } = renderHeader();
    const timelineLink = getByTestId('timeline').querySelector('a');

    expect(timelineLink).toHaveAttribute('href', '/timeline');
  });

  test('has a tag with /mybox', () => {
    const { getByTestId } = renderHeader();
    const myboxLink = getByTestId('mybox').querySelector('a');

    expect(myboxLink).toHaveAttribute('href', '/mybox');
  });

  describe.each(NAV_ITEMS)('with active $href', ({ testId, href }) => {
    test('has font style bold', () => {
      const { getByTestId } = renderHeader({ active: href });
      const link = getByTestId(testId);
      expect(link).toHaveStyle({ fontWeight: 'bold' });
    });
  });
});

describe('user info section', () => {
  describe('with onSignUp method', () => {
    const onSignUp = jest.fn();
    test('run on click sign up text', () => {
      const { getByTestId } = renderHeader({ onSignUp });
      const signUp = getByTestId('sign-up');
      fireEvent.click(signUp);
      expect(onSignUp).toBeCalled();
    });
  });

  describe('with onSignUp method', () => {
    const onSignIn = jest.fn();
    test('run on click sign up text', () => {
      const { getByTestId } = renderHeader({ onSignIn });
      const signIn = getByTestId('sign-in');
      fireEvent.click(signIn);
      expect(onSignIn).toBeCalled();
    });
  });
});
