import { Deferred } from './deferred';

describe('Deferred', () => {
  test('resolve', () => {
    const value = 1;
    const def = new Deferred<number>();

    expect(def.isResolved()).toBeFalsy();
    expect(def.isRejected()).toBeFalsy();

    def.resolve(value);

    expect(def.isResolved()).toBeTruthy();
    expect(def.isRejected()).toBeFalsy();
  });
});
