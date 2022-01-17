import DateItems from '@/components/mybox/utils/DateItems';

describe.each([
  [2021, 12, 31],
  [2021, 11, 30],
  [2020, 2, 29],
])('%d년 %d월로 생성 시', (year, month, expected) => {
  const dateItems = new DateItems(year, month);
  test(expected + ' 길이의 배열을 가짐', () => {
    expect(dateItems.getDates()).toHaveLength(expected);
  });
});

describe('setShapes 실행 시', () => {
  const dateItems = new DateItems(2021, 12);
  const postDates = [2, 11, 12, 13];
  dateItems.setShapes(postDates);

  test('혼자 떨어져있으면 alone', () => {
    expect(dateItems.getDates()[1].shape).toEqual('alone');
  });

  test('왼쪽이면 left', () => {
    expect(dateItems.getDates()[10].shape).toEqual('left');
  });

  test('가운데면 center', () => {
    expect(dateItems.getDates()[11].shape).toEqual('center');
  });

  test('오른쪽이면 right', () => {
    expect(dateItems.getDates()[12].shape).toEqual('right');
  });
});
