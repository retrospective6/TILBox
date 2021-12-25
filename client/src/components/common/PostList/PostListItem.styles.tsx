import styled from '@emotion/styled';
import FONT from '@/styles/font';
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
  ${FONT.caption2};
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
  ${FONT.body4};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
`;

export const SocialInfo = styled.div`
  margin-top: 15px;
  ${FONT.caption2};
  color: #666666;
`;

export const Dot = styled.span`
  margin: 0 6px;
`;
