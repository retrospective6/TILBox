import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  width: 100vw;
  height: 64px;
  background-color: #f3f3f3;
  justify-content: center;
  padding-left: 76px;
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
  width: 12.5%;
  min-width: 140px;
  align-items: center;
`;

export const UserInfoItem = styled.button`
  margin-right: 20px;
  font-size: 12px;
`;

export const UserImage = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 10px;
  border-radius: 50%;
`;
