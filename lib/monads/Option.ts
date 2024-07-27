export interface Option<A> {
  readonly isDefined: boolean;
  readonly isEmpty: boolean;
  readonly size: number;

  get(): A;
  getOrElse(or: () => A): A;

  map<B>(f: (a: A) => B): Option<B>;
  flatMap<B>(f: (a: A) => Option<B>): Option<B>;

  exists(p: (a: A) => boolean): boolean;
  filter(p: (a: A) => boolean): Option<A>;
  foreach(f: (a: A) => void): void;
}

export class Some<A> implements Option<A> {
  constructor(public readonly value: A) {}

  public readonly isDefined: boolean = true;
  public readonly isEmpty: boolean = false;
  public readonly size: number = 1;

  get(): A {
    return this.value;
  }

  getOrElse(or: () => A): A {
    return this.value;
  }

  map<B>(f: (a: A) => B): Option<B> {
    return new Some<B>(f(this.value));
  }

  flatMap<B>(f: (a: A) => Option<B>): Option<B> {
    return f(this.value);
  }

  exists(p: (a: A) => boolean): boolean {
    return p(this.value);
  }

  filter(p: (a: A) => boolean): Option<A> {
    if (p(this.value)) {
      return this;
    } else {
      return new None<A>();
    }
  }

  foreach(f: (a: A) => void): void {
    f(this.value);
  }
}

export class None<A> implements Option<A> {
  constructor() {}

  public readonly isDefined: boolean = false;
  public readonly isEmpty: boolean = true;
  public readonly size: number = 0;

  get(): A {
    throw new Error('NoSuchElementException None.get');
  }

  getOrElse(or: () => A): A {
    return or();
  }

  map<B>(f: (a: A) => B): Option<B> {
    return new None<B>();
  }

  flatMap<B>(f: (a: A) => Option<B>): Option<B> {
    return new None<B>();
  }

  exists(p: (a: A) => boolean): boolean {
    return false;
  }

  filter(p: (a: A) => boolean): Option<A> {
    return this;
  }

  foreach(f: (a: A) => void): void {}
}

export namespace Option {
  export function some<T>(value: T): Option<T> {
    return new Some<T>(value);
  }

  export function none<T>(): Option<T> {
    return new None<T>();
  }
}
