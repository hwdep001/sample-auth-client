export class JwtInfo {

  private _jti: string;
  private _clientId: string;
  private _userName: string;
  private _authorities: string;
  private _scope: string;
  private _exp: number;

  constructor(payload: string) {
    const payloadJson = JSON.parse(payload);
    this._jti = payloadJson.jti;
    this._clientId = payloadJson.client_id;
    this._userName = payloadJson.user_name;
    this._authorities = payloadJson.authorities;
    this._scope = payloadJson.scope;
    this._exp = payloadJson.exp;
  }

  get jti(): string {
    return this._jti;
  }

  set jti(jti: string) {
    this._jti = jti;
  }

  get clientId(): string {
    return this._clientId;
  }

  set clientId(clientId: string) {
    this._clientId = clientId;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(userName: string) {
    this._userName = userName;
  }

  get authorities(): string {
    return this._authorities;
  }

  set authorities(authorities: string) {
    this._authorities = authorities;
  }

  get scope(): string {
    return this._scope;
  }

  set scope(scope: string) {
    this._scope = scope;
  }

  get exp(): number {
    return this._exp;
  }

  set exp(exp: number) {
    this._exp = exp;
  }
  
}