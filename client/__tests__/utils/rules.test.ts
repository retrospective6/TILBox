import rules from '@/utils/rules';

describe('nickname', () => {
  test.each([
    ['12', true],
    ['12345678', true],
    ['ab', true],
    ['abcdefgh', true],
    ['가나다라마바사', true],
    ['👍👍', true],
    ['👍👍👍👍👍👍👍👍', true],
    ['1', false],
    ['123456789', false],
    ['👍', false],
  ])('%s be %s', (value: string, expected: boolean) => {
    const result = rules.nickname(value);
    expect(result).toEqual(expected);
  });
});

describe('password', () => {
  test.each([
    ['!@#$1234qwer', true],
    ['123456q!', true],
    ['!@#$1234', false],
    ['!@#$qwer', false],
    ['1234qwer', false],
    ['12!@qw', false],
  ])('%s be %s', (value: string, expected: boolean) => {
    const result = rules.password(value);
    expect(result).toEqual(expected);
  });
});

describe('myTilAddress', () => {
  test.each([
    ['asdf', true],
    ['1234', true],
    ['asdf1234', true],
    ['ASDF', true],
    ['ASDSF1234', true],
    ['!@#$@%', false],
  ])('%s be %s', (value: string, expected: boolean) => {
    const result = rules.address(value);
    expect(result).toEqual(expected);
  });
});

describe('email', () => {
  test.each([
    ['test@test.com', true],
    ['test', false],
    ['test@', false],
    ['test@test', false],
  ])('%s be %s', (value: string, expected: boolean) => {
    const result = rules.email(value);
    expect(result).toEqual(expected);
  });
});
