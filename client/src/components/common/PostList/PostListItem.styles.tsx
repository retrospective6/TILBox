import styled from '@emotion/styled';
import Image from 'next/image';

export const PostListItem = styled.div`
  width: 264px;
  height: 341px;
  box-shadow: 4px 6px 16px rgba(174, 174, 174, 0.25);
  border-radius: 0 0 16px 16px;
`;

export const Thumbnail = styled.div`
  height: 170px;
`;

export interface UserInfoProps {
  admin?: boolean;
}

export const UserInfo = styled.div<UserInfoProps>`
  height: 26px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 10px;
  line-height: 16px;
  color: #dddddd;
  background-color: ${({ admin }) => (admin ? '#C90909' : '#000000')};
`;

export const UserImage = styled(Image)`
  border-radius: 50%;
`;

export const UserNickname = styled.span`
  margin-left: 8px;
`;

export const CreatedAt = styled.span`
  margin-left: auto;
`;

export const Contents = styled.div`
  margin: 8px auto;
  width: 227px;
`;

export const Description = styled.p`
  margin-bottom: 15px;
  width: 227px;
  height: 54px;
  font-size: 14px;
  line-height: 18px;
  overflow-y: hidden;
`;

export const SocialInfo = styled.div`
  margin-top: 15px;
  font-size: 10px;
  line-height: 16px;
  color: #666666;
`;

export const Dot = styled.span`
  margin: 0 6px;
`;
