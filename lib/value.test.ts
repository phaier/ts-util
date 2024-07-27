import {
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isDate,
  isNone,
  isArray,
  isEqualArray,
  isObject,
  isEmptyObject,
  isEqualObject,
  equals,
} from './value';

describe('isAny', () => {
  test('isString', () => {
    expect(isString(undefined)).toBeFalsy();
    expect(isString([])).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString(100)).toBeFalsy();

    expect(isString('')).toBeTruthy();
    expect(isString('aaa')).toBeTruthy();
    expect(isString('全角文字列')).toBeTruthy();

    expect(isString('')).toBeTruthy();
    expect(isString('aaa')).toBeTruthy();
    expect(isString('全角文字列')).toBeTruthy();
  });

  test('isFunction', () => {
    expect(isFunction(undefined)).toBeFalsy();
    expect(isFunction([])).toBeFalsy();
    expect(isFunction({})).toBeFalsy();
    expect(isFunction(100)).toBeFalsy();
    expect(isFunction('aaa')).toBeFalsy();

    expect(isFunction(() => {})).toBeTruthy();
  });

  test('isArray', () => {
    expect(isArray(undefined)).toBeFalsy();
    expect(isArray({})).toBeFalsy();
    expect(isArray(null)).toBeFalsy();
    expect(isArray(100)).toBeFalsy();
    expect(isArray(1.0)).toBeFalsy();
    expect(isArray('aaa')).toBeFalsy();

    expect(isArray([])).toBeTruthy();
    expect(isArray([1, 2, 3])).toBeTruthy();
    expect(isArray([1, 2, 'aaaa'])).toBeTruthy();
  });

  test('isDate', () => {
    expect(isDate(undefined)).toBeFalsy();
    expect(isDate(null)).toBeFalsy();
    expect(isDate(0)).toBeFalsy();
    expect(isDate(1)).toBeFalsy();
    expect(isDate(1.0)).toBeFalsy();
    expect(isDate({})).toBeFalsy();
    expect(isDate('string')).toBeFalsy();

    expect(isDate(new Date())).toBeTruthy();
  });

  test('isEqualArray', () => {
    expect(isEqualArray('', '')).toBeFalsy();
    expect(isEqualArray(1, 1)).toBeFalsy();
    expect(isEqualArray(null, null)).toBeFalsy();
    expect(isEqualArray([], '')).toBeFalsy();
    expect(isEqualArray('', [])).toBeFalsy();

    expect(isEqualArray([1, 2, 3], [1, 2])).toBeFalsy();
    expect(isEqualArray([1, 2, 3], [1, 2, 4])).toBeFalsy();
    expect(isEqualArray([], [1])).toBeFalsy();
    expect(isEqualArray([1], [])).toBeFalsy();

    expect(isEqualArray([], [])).toBeTruthy();
    expect(isEqualArray([1, 2], [1, 2])).toBeTruthy();
    expect(isEqualArray([1, 2, 3], [1, 2, 3])).toBeTruthy();
  });

  test('isNone', () => {
    expect(isNone(undefined)).toBeTruthy();
    expect(isNone(null)).toBeTruthy();

    expect(isNone('')).toBeFalsy();
    expect(isNone(0)).toBeFalsy();
    expect(isNone({})).toBeFalsy();
  });

  test('isBoolean', () => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(false)).toBeTruthy();

    expect(isBoolean(undefined)).toBeFalsy();
    expect(isBoolean(null)).toBeFalsy();
  });

  test('isNumber', () => {
    expect(isNumber(0)).toBeTruthy();
    expect(isNumber(1)).toBeTruthy();

    expect(isNumber(undefined)).toBeFalsy();
    expect(isNumber(null)).toBeFalsy();
    expect(isNumber('')).toBeFalsy();
    expect(isNumber({})).toBeFalsy();
    expect(isNumber([])).toBeFalsy();
  });

  test('isObject', () => {
    expect(isObject({})).toBeTruthy();
  });

  test('isEqualObject', () => {
    expect(isEqualObject(undefined, undefined)).toBeTruthy();
    expect(isEqualObject(null, null)).toBeTruthy();
    expect(isEqualObject(1, 1)).toBeTruthy();
    expect(isEqualObject('1', '1')).toBeTruthy();

    expect(isEqualObject(undefined, null)).toBeFalsy();
    expect(isEqualObject(null, undefined)).toBeFalsy();
    expect(isEqualObject(1, 2)).toBeFalsy();
    expect(isEqualObject('1', '2')).toBeFalsy();

    expect(isEqualObject([], [])).toBeTruthy();
    expect(isEqualObject([1, 2, 3], [1, 2, 3])).toBeTruthy();

    expect(isEqualObject({}, {})).toBeTruthy();
  });

  test('equals', () => {
    expect(equals(undefined, undefined)).toBeTruthy();
    expect(equals(null, null)).toBeTruthy();
    expect(equals(NaN, NaN)).toBeTruthy();

    expect(equals(0, 0)).toBeTruthy();
    expect(equals(1, 1)).toBeTruthy();
    expect(equals('0', '0')).toBeTruthy();
    expect(equals('0', '0')).toBeTruthy();
  });
});
