import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  width: 100%;
  min-height: 64px;
  justify-content: start;
  padding: 0 48px 0 76px;
  white-space: nowrap;
`;

export const Left = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1280px) {
    height: 96px;
    flex-direction: column;
    justify-content: start;
  }
`;

export const Navbar = styled.nav`
  min-height: 64px;
  margin-right: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 18px;
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
`;

interface NavItemProps {
  active: boolean;
}

export const NavItem = styled.div<NavItemProps>`
  display: flex;
  align-items: center;
  height: 14px;
  padding: 0 18px;
  border-right: 1px solid #cdcdcd;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

export const UserInfo = styled.div`
  margin-left: auto;
  height: 64px;
  display: flex;
  align-items: center;
`;

export const UserInfoItem = styled.button`
  margin-right: 20px;
  background: transparent;
  font-size: 12px;
`;

export const UserImage = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 14px;
  border-radius: 50%;
`;

export const UserNickname = styled.span`
  margin-right: 20px;
  background: transparent;
  font-size: 12px;
`;
