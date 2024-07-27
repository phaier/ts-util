import { Option } from './Option';

describe('Option', () => {
  test('Some', () => {
    const value = 1;
    const opt = Option.some(value);

    expect(opt.isDefined).toBeTruthy();
    expect(opt.isEmpty).toBeFalsy();

    expect(opt.size).toBe(1);

    expect(opt.get()).toBe(value);
    expect(
      opt.getOrElse(() => {
        throw new Error('');
      })
    ).toBe(value);

    expect(opt.map(() => 2).get()).toBe(2);
    expect(opt.flatMap(() => Option.some(2)).get()).toBe(2);

    expect(opt.exists(() => true)).toBeTruthy();
    expect(opt.exists(() => false)).toBeFalsy();

    expect(opt.filter(() => true).get()).toBe(value);
    expect(() => {
      opt.filter(() => false).get();
    }).toThrow();

    expect(() => {
      opt.foreach(() => {
        throw new Error('');
      });
    }).toThrow();
  });

  test('None', () => {
    const opt = Option.none<number>();

    expect(opt.isDefined).toBeFalsy();
    expect(opt.isEmpty).toBeTruthy();

    expect(opt.size).toBe(0);

    expect(() => {
      opt.get();
    }).toThrow();
    expect(opt.getOrElse(() => 1)).toBe(1);

    expect(() => {
      opt
        .map(() => {
          throw new Error('');
        })
        .get();
    }).toThrow();
    expect(() => {
      opt
        .flatMap(() => {
          throw new Error('');
        })
        .get();
    }).toThrow();

    expect(opt.exists(() => true)).toBeFalsy();
    expect(opt.exists(() => false)).toBeFalsy();

    expect(() => {
      opt.filter(() => true).get();
    }).toThrow();
    expect(() => {
      opt.filter(() => false).get();
    }).toThrow();

    expect(() => {
      opt.foreach(() => {
        throw new Error('');
      });
    });
  });
});
