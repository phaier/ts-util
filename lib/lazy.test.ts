import { lazy } from './lazy';

describe('lazy', () => {
  test('test lazy', async () => {
    let calling = false;
    let called = false;
    let count = 0;

    const value = lazy<number>(async () => {
      expect(calling).toBeTruthy();
      expect(called).toBeFalsy();
      expect(count).toBe(0);

      count += 1;
      return 1;
    });

    calling = true;
    expect(count).toBe(0);

    const result = await value();
    expect(count).toBe(1);
    expect(result).toBe(1);

    called = true;

    const result2 = await value();
    expect(count).toBe(1);
    expect(result2).toBe(1);
  });
});
