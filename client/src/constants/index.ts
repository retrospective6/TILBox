import { ThumbnailGradient, VisibleLevel } from '@/types/Post';

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

export const DATE_FORMAT = 'YYYY.MM.DD';
