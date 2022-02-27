import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import SlideMenu, { SlideMenuProps } from '@/components/common/SlideMenu';
import { PROFILE } from '@mocks/data/users';
import { Profile } from '@/types/User';
import { IMG_SRC } from '@mocks/data';
import cookie from '@mocks/cookie';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

const DEFAULT_ARGS: SlideMenuProps = {
  onClose: jest.fn(),
  profile: PROFILE,
};

const renderSlideMenu = (props: Partial<SlideMenuProps>): RenderResult => {
  return render(<SlideMenu {...DEFAULT_ARGS} {...props} />);
};

describe('with profile', () => {
  const profile: Profile = {
    nickname: '김현우',
    image: IMG_SRC,
  };

  test('profile image 출력', () => {
    const { getByAltText } = renderSlideMenu({ profile });
    getByAltText(profile.nickname);
  });

  test('profile nickname 출력', () => {
    const { getByText } = renderSlideMenu({ profile });
    getByText(profile.nickname);
  });
});

describe('로그아웃', () => {
  const mockedReload = jest.fn();
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    reload: mockedReload,
  }));

  test('메뉴 클릭 시 cookie 삭제', () => {
    const { getByTestId } = renderSlideMenu({});
    const logout = getByTestId('logout');
    fireEvent.click(logout);

    expect(cookie.get('accessToken')).toBeFalsy();
  });

  test('메뉴 클릭 시 리로드', () => {
    const { getByTestId } = renderSlideMenu({});
    const logout = getByTestId('logout');
    fireEvent.click(logout);

    expect(mockedReload).toBeCalled();
  });
});

describe('with onClose method', () => {
  test('run method on click wrapper', () => {
    const onClose = jest.fn();

    const { getByTestId } = renderSlideMenu({ onClose });
    const wrapper = getByTestId('menu-wrapper');
    fireEvent.click(wrapper);

    expect(onClose).toBeCalled();
  });
});
