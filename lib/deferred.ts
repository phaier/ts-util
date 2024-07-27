export class Deferred<T> {
  private readonly p: Promise<T>;

  private res: ((value: T) => void) | undefined;

  private rej: ((reason: any) => void) | undefined;

  private _isRejected = false;

  private _isResolved = false;

  constructor() {
    this.p = new Promise<T>((resolve, reject) => {
      this.res = resolve;
      this.rej = reject;
    });
  }

  public promise(): Promise<T> {
    return this.p;
  }

  public resolve(value: T): void {
    if (!(this._isRejected || this._isResolved)) {
      this._isResolved = true;
      this.res!(value);
    }
  }

  public reject(reason: any): void {
    if (!(this._isRejected || this._isResolved)) {
      this._isRejected = true;
      this.rej!(reason);
    }
  }

  public isRejected(): boolean {
    return this._isRejected;
  }

  public isResolved(): boolean {
    return this._isResolved;
  }
}
