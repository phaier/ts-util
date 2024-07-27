export function lazy<T>(f: () => Promise<T>): () => Promise<T> {
  let evaluated = false;
  let result: Promise<T>;

  return () => {
    if (!evaluated) {
      evaluated = true;
      result = f();
    }

    return result;
  };
}
