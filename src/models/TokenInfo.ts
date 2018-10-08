export class TokenInfo {

  private _accessToken: string;
  private _tokenType: string;
  private _refreshToken: string;
  private _expiresIn: number;
  private _scope: string;
  private _jti: string;
  
  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken;
  }
  
  get tokenType(): string {
    return this._tokenType;
  }

  set tokenType(tokenType: string) {
    this._tokenType = tokenType;
  }
  
  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }
  
  get expiresIn(): number {
    return this._expiresIn;
  }

  set expiresIn(expiresIn: number) {
    this._expiresIn = expiresIn;
  }
  
  get scope(): string {
    return this._scope;
  }

  set scope(scope: string) {
    this._scope = scope;
  }
  
  get jti(): string {
    return this._jti;
  }

  set jti(jti: string) {
    this._jti = jti;
  }

}