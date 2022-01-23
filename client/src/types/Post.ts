import User from '@/types/User';

export default interface Post {
  id: number;
  user: User;
  title: string;
  content: string;
  thumbnail: Thumbnail;
  summary: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  tags?: string[];
  visibleLevel: VisibleLevel;
}

export interface Comment {
  id: number;
  postId?: number;
  user: User;
  content: string;
  comments?: Comment[];
  createdAt: Date;
}

export type VisibleLevel = 'public' | 'private';

export type Thumbnail = {
  img?: string;
  gradient?: ThumbnailGradient;
};

export type ThumbnailGradient = {
  start: string;
  end: string;
};
