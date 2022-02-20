export type NavLinks = '/' | '/timeline' | '/mybox';

export const NAV_ITEMS: {
  testId: string;
  href: NavLinks;
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
