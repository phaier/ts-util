export class LeftProjection<L, R> {
  private readonly _e: Either<L, R>;

  constructor(e: Either<L, R>) {
    this._e = e;
  }

  get exists(): boolean {
    return this._e.isLeft;
  }

  flatMap<L2>(f: (l: L) => Either<L2, R>): Either<L2, R> {
    if (this._e.isLeft) {
      return f((<Left<L, R>>this._e).value);
    } else {
      return new Right<L2, R>((<Right<L, R>>this._e).value);
    }
  }

  get(): L {
    if (this._e.isLeft) {
      return (<Left<L, R>>this._e).value;
    } else {
      throw new Error('NoSuchElementException Left.get');
    }
  }

  getOrElse(or: () => L): L {
    if (this._e.isLeft) {
      return (<Left<L, R>>this._e).value;
    } else {
      return or();
    }
  }

  map<L2>(f: (l: L) => L2): Either<L2, R> {
    if (this._e.isLeft) {
      return new Left<L2, R>(f((<Left<L, R>>this._e).value));
    } else {
      return new Right<L2, R>((<Right<L, R>>this._e).value);
    }
  }
}

export class RightProjection<L, R> {
  private readonly _e: Either<L, R>;

  constructor(e: Either<L, R>) {
    this._e = e;
  }

  get exists(): boolean {
    return this._e.isRight;
  }

  flatMap<R2>(f: (r: R) => Either<L, R2>): Either<L, R2> {
    if (this._e.isRight) {
      return f((<Right<L, R>>this._e).value);
    } else {
      return new Left<L, R2>((<Left<L, R>>this._e).value);
    }
  }

  get(): R {
    if (this._e.isRight) {
      return (<Right<L, R>>this._e).value;
    } else {
      throw new Error('NoSuchElementException Left.get');
    }
  }

  getOrElse(or: () => R): R {
    if (this._e.isRight) {
      return (<Right<L, R>>this._e).value;
    } else {
      return or();
    }
  }

  map<R2>(f: (r: R) => R2): Either<L, R2> {
    if (this._e.isRight) {
      return new Right<L, R2>(f((<Right<L, R>>this._e).value));
    } else {
      return new Left<L, R2>((<Left<L, R>>this._e).value);
    }
  }
}

export interface Either<L, R> {
  readonly isLeft: boolean;
  readonly isRight: boolean;

  readonly left: LeftProjection<L, R>;
  readonly right: RightProjection<L, R>;

  get(): R;
  getOrElse(or: () => R): R;

  map<R2>(f: (r: R) => R2): Either<L, R2>;
  flatMap<R2>(f: (r: R) => Either<L, R2>): Either<L, R2>;

  swap(): Either<R, L>;
}

export class Left<L, R> implements Either<L, R> {
  public readonly value: L;

  constructor(l: L) {
    this.value = l;
  }

  get isLeft(): boolean {
    return true;
  }

  get isRight(): boolean {
    return false;
  }

  get left(): LeftProjection<L, R> {
    return new LeftProjection<L, R>(this);
  }

  get right(): RightProjection<L, R> {
    return new RightProjection<L, R>(this);
  }

  get(): R {
    throw new Error('NoSuchElementException Left.get');
  }

  getOrElse(or: () => R): R {
    return or();
  }

  map<R2>(f: (r: R) => R2): Either<L, R2> {
    return new Left<L, R2>(this.value);
  }

  flatMap<R2>(f: (r: R) => Either<L, R2>): Either<L, R2> {
    return new Left<L, R2>(this.value);
  }

  swap(): Either<R, L> {
    return new Right<R, L>(this.value);
  }
}

export class Right<L, R> implements Either<L, R> {
  public readonly value: R;

  constructor(r: R) {
    this.value = r;
  }

  get isLeft(): boolean {
    return false;
  }

  get isRight(): boolean {
    return true;
  }

  get left(): LeftProjection<L, R> {
    return new LeftProjection<L, R>(this);
  }

  get right(): RightProjection<L, R> {
    return new RightProjection<L, R>(this);
  }

  get(): R {
    return this.value;
  }

  getOrElse(or: () => R): R {
    return this.value;
  }

  map<R2>(f: (r: R) => R2): Either<L, R2> {
    return new Right<L, R2>(f(this.value));
  }

  flatMap<R2>(f: (r: R) => Either<L, R2>): Either<L, R2> {
    return f(this.value);
  }

  swap(): Either<R, L> {
    return new Left<R, L>(this.value);
  }
}

export namespace Either {
  export function right<L, R>(value: R): Either<L, R> {
    return new Right<L, R>(value);
  }

  export function left<L, R>(value: L): Either<L, R> {
    return new Left<L, R>(value);
  }
}
