import { asError, isError } from './error';

test.each<[unknown, boolean]>([
  [null, false],
  [undefined, false],
  [new Error(), true],
  [{ message: 'message', name: 'name' }, true],
  [{ message: 'message' }, false],
  ['string', false],
])(`isError(%j) should return %j`, (obj, expected) => {
  expect(isError(obj)).toBe(expected);
});

test('asError', () => {
  expect(asError({ message: 'message', name: 'name' })).toStrictEqual({ message: 'message', name: 'name' });

  expect(asError(new Error('message'))).toStrictEqual(new Error('message'));
  expect(asError('string')).toStrictEqual(new Error('string'));

  expect(asError(123)).toStrictEqual(new Error('123'));
  expect(asError(null)).toStrictEqual(new Error('null'));
  expect(asError(undefined)).toStrictEqual(new Error('undefined'));
});
