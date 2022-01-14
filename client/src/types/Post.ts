import User from '@/types/User';

export default interface Post {
  id: number;
  user: User;
  title: string;
  content: string;
  thumbnail: string;
  description: string;
  likes: number;
  comments: number;
  createdAt: Date;
  tags?: string[];
}
