import { Either } from './Either';

describe('Either', () => {
  test('Left', () => {
    const value = 'a';
    const other = 1;
    const l = Either.left<string, number>(value);

    expect(l.isLeft).toBeTruthy();
    expect(l.isRight).toBeFalsy();

    expect(() => {
      l.get();
    }).toThrow();
    expect(l.getOrElse(() => other)).toBe(other);
    expect(() => {
      l.map(() => {
        throw new Error('');
      }).get();
    }).toThrow();
    expect(() => {
      l.flatMap(() => {
        throw new Error('');
      }).get();
    }).toThrow();

    expect(l.left.exists).toBeTruthy();
    expect(l.left.get()).toBe(value);
    expect(
      l.left.getOrElse(() => {
        throw new Error('');
      })
    ).toBe(value);
    expect(l.left.map(() => 'b').left.get()).toBe('b');
    expect(l.left.flatMap(() => Either.left<string, number>('b')).left.get()).toBe('b');

    expect(l.right.exists).toBeFalsy();
    expect(() => {
      l.right.get();
    }).toThrow();
    expect(l.right.getOrElse(() => other)).toBe(other);
    expect(
      l.right
        .map(() => {
          throw new Error('');
        })
        .left.get()
    ).toBe(value);
    expect(
      l.right
        .flatMap(() => {
          throw new Error('');
        })
        .left.get()
    ).toBe(value);
  });

  test('Right', () => {
    const value = 'a';
    const other = 1;
    const r = Either.right<number, string>(value);

    expect(r.isLeft).toBeFalsy();
    expect(r.isRight).toBeTruthy();

    expect(r.get()).toBe(value);
    expect(
      r.getOrElse(() => {
        throw new Error('');
      })
    ).toBe(value);
    expect(r.map(() => 'b').get()).toBe('b');
    expect(r.flatMap(() => Either.right<number, string>('b')).get()).toBe('b');

    expect(r.left.exists).toBeFalsy();
    expect(() => {
      r.left.get();
    }).toThrow();
    expect(r.left.getOrElse(() => other)).toBe(other);
    expect(
      r.left
        .map(() => {
          throw new Error('');
        })
        .get()
    ).toBe(value);
    expect(
      r.left
        .flatMap(() => {
          throw new Error('');
        })
        .get()
    ).toBe(value);

    expect(r.right.exists).toBeTruthy();
    expect(r.right.get()).toBe(value);
    expect(
      r.right.getOrElse(() => {
        throw new Error('');
      })
    ).toBe(value);
    expect(r.right.map(() => 'b').get()).toBe('b');
    expect(r.right.flatMap(() => Either.right<number, string>('b')).get()).toBe('b');
  });
});
