import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Header, { HeaderProps } from '@/components/common/Header/Header';
import { NAV_ITEMS } from '@/constants/routers';
import { Profile } from '@/types/User';

const DEFAULT_ARGS: HeaderProps = {
  active: '/',
  onLogin: jest.fn(),
  onWrite: jest.fn(),
  onSearch: jest.fn(),
};

const renderHeader = (props: Partial<HeaderProps> = {}): RenderResult => {
  return render(<Header {...DEFAULT_ARGS} {...props} />);
};

describe('logo', () => {
  test('has a tag with /', () => {
    const { getByTestId } = renderHeader();
    const logo = getByTestId('logo');

    expect(logo).toHaveAttribute('href', '/');
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
  describe('with onLogin method', () => {
    const onLogin = jest.fn();
    test('run method on click sign in text', () => {
      const { getByTestId } = renderHeader({ onLogin });
      const login = getByTestId('login');
      fireEvent.click(login);
      expect(onLogin).toBeCalled();
    });
  });

  describe('with user', () => {
    const profile: Profile = {
      nickname: 'testNickName',
      image: 'testImage',
    };

    test('disappear signUp text', () => {
      const { getByTestId } = renderHeader({ profile });
      expect(() => getByTestId('sign-up')).toThrowError();
    });

    test('disappear login text', () => {
      const { getByTestId } = renderHeader({ profile });
      expect(() => getByTestId('login')).toThrowError();
    });

    test('display user nickname', () => {
      const { getByTestId } = renderHeader({ profile });
      const nickname = getByTestId('user-nickname');
      expect(nickname).toHaveTextContent(profile.nickname);
    });

    test('display user img', () => {
      const { getByRole } = renderHeader({ profile });
      const img = getByRole('img');
      expect(img).toHaveAttribute('src', profile.image);
    });

    describe('with onWrite method', () => {
      const onWrite = jest.fn();
      test('run method on click write button', () => {
        const { getByTestId } = renderHeader({ profile, onWrite });
        const writeButton = getByTestId('write-button');
        fireEvent.click(writeButton);
        expect(onWrite).toBeCalled();
      });
    });
  });
});
