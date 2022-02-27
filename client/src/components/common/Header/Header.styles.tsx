import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  width: 100vw;
  height: 64px;
  justify-content: center;
  padding: 0 48px 0 76px;
  white-space: nowrap;
`;

export const Navbar = styled.div`
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
  display: flex;
  margin-left: auto;
  align-items: center;
`;

export const UserInfoItem = styled.button`
  margin-right: 20px;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
`;

export const UserImage = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 14px;
  border-radius: 50%;
  cursor: pointer;
`;

export const UserNickname = styled.span`
  margin-right: 20px;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
`;
