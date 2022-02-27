import styled from '@emotion/styled';
import FONT from '@/styles/font';

export const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: rgba(205, 205, 205, 0.5);
`;

export const Container = styled.menu`
  width: 350px;
  height: 100vh;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 66px;
  background-color: #ffffff;
`;

export const ProfileImage = styled.img`
  width: 82px;
  height: 82px;
  border-radius: 50%;
`;

export const Nickname = styled.span`
  margin: 16px;
  ${FONT.title3};
`;

export const Boundary = styled.div`
  margin: 20px 0;
  width: 100%;
  height: 1px;
  background-color: #dddddd;
`;

export const Menu = styled.ul`
  width: 100%;
  ${FONT.body2};
`;

export const MenuItem = styled.li`
  margin-bottom: 16px;
  cursor: pointer;
`;
