export function isError(obj: unknown): obj is Error {
  if (obj === null || obj === undefined) {
    return false;
  }

  if (obj instanceof Error) {
    return true;
  }

  if (typeof obj === 'object') {
    if (typeof (obj as Error).message === 'string' && typeof (obj as Error).name === 'string') {
      return true;
    }
  }

  return false;
}

export function asError(obj: unknown): Error {
  if (isError(obj)) {
    return obj;
  }

  if (typeof obj === 'string') {
    return new Error(obj);
  }

  return new Error(String(obj));
}
