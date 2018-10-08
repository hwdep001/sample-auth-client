export class ResponseDate {

  private _res: boolean;
  private _code: number;
  private _msg: string;
  private _data: any;

  get res(): boolean {
    return this._res;
  }

  set res(res: boolean) {
    this._res = res;
  }

  get code(): number {
    return this._code;
  }

  set code(code: number) {
    this._code = code;
  }

  get msg(): string {
    return this._msg;
  }

  set msg(msg: string) {
    this._msg = msg;
  }

  get data(): any {
    return this._data;
  }

  set data(data: any) {
    this._data = data;
  }

}