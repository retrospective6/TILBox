import { ThumbnailGradient, VisibleLevel } from '@/types/Post';

export type NAV_LINKS = '/' | '/timeline' | '/mybox';

export const NAV_ITEMS: {
  testId: string;
  href: NAV_LINKS;
  title: string;
}[] = [
  {
    testId: 'main',
    href: '/',
    title: '전체글',
  },
  {
    testId: 'timeline',
    href: '/timeline',
    title: 'Timeline',
  },
  {
    testId: 'mybox',
    href: '/mybox',
    title: 'MyBOX',
  },
];

export const ADMIN_NICKNAME = '운영자';

export const THUMBNAIL_GRADIENTS: ThumbnailGradient[] = [
  { start: '#d55438', end: '#fea768' },
  { start: '#1730b6', end: '#3f97d7' },
  { start: '#3ead17', end: '#09abce' },
  { start: '#5e0303', end: '#ad1223' },
  { start: '#ffde6a', end: '#dc8401' },
];

export const VISIBLE_LEVELS: { value: VisibleLevel; label: string }[] = [
  { value: 'public', label: '전체공개' },
  { value: 'private', label: '나만보기' },
];
