/**
 * Returns true if the value is string, false otherwise.
 * @param value The value to be checked.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

/**
 * Returns true if the value is Array, false otherwise.
 */
export const { isArray } = Array;

/**
 * Returns true if the value is number, false otherwise.
 * @param value The value to be checked.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' || value instanceof Number;
}

/**
 * Returns true if the value is Function, false otherwise.
 * @param value The value to be checked.
 */
export function isFunction(value: unknown): value is Function {
  return !!value && (typeof value === 'function' || value instanceof Function);
}

/**
 * Returns true if the value is Date, false otherwise.
 * @param value The value to be checked.
 */
export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * Returns true if the value is Object, false otherwise.
 * @param value The value to be checked.
 */
export function isObject(value: unknown): value is object {
  // isPlainObject にすべき？
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Returns true if the value is empty object, false otherwise.
 * @param value The value to be checked.
 */
export function isEmptyObject(value: unknown): boolean {
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Returns true if the value is undefined or null, false otherwise.
 * @param value The value to be checked.
 */
export function isNone(value: unknown): boolean {
  return value === undefined || value === null;
}

/**
 * Returns true if the value is boolean, false otherwise.
 * @param value The value to be checked.
 */
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false;
}

function equalArray(value1: unknown[], value2: unknown[]): boolean {
  const len: number = value1.length;

  if (len !== value2.length) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    if (value1[i] !== value2[i]) {
      return false;
    }
  }

  return true;
}

export function isEqualObject(value1: unknown, value2: unknown): boolean {
  if (value1 === value2) {
    return true;
  }

  if (isObject(value1) && isObject(value2)) {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (equalArray(keys1, keys2)) {
      const len = keys1.length;
      for (let i = 0; i < len; i++) {
        // @ts-ignore
        const v1: unknown = value1[keys1[i]];
        // @ts-ignore
        const v2: unknown = value2[keys2[i]];
        if (!isEqualObject(v1, v2)) {
          return false;
        }
      }

      return true;
    }
  }

  if (isArray(value1) && isArray(value2)) {
    return equalArray(value1, value2);
  }

  return false;
}

export function isEqualArray(value1: unknown, value2: unknown): boolean {
  if (isArray(value1) && isArray(value2)) {
    return equalArray(value1, value2);
  }

  return false;
}

export function equals(a: unknown, b: unknown): boolean {
  if (!a && !b) {
    if (Number.isNaN(a) && Number.isNaN(b)) {
      return true;
    }
  }

  return a === b;
}
