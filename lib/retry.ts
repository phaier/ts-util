export async function withRetry<T>(max: number, action: () => Promise<T>): Promise<T> {
  for (let i = 0; i < max; i++) {
    try {
      // eslint-disable-next-line no-await-in-loop
      return await action();
    } catch (error) {
      if (i === max - 1) {
        throw error;
      }
    }
  }

  throw new Error('unreachable');
}
