export class ReqTokenInfo {

  private _clientId: string;
  private _clientSecret: string;
  private _grantType: string;
  private _username: string;
  private _password: string;
  private _refreshToken: string;

  get clientId(): string {
    return this._clientId;
  }

  set clientId(clientId: string) {
    this._clientId = clientId;
  }

  get clientSecret(): string {
    return this._clientSecret;
  }

  set clientSecret(clientSecret: string) {
    this._clientSecret = clientSecret;
  }

  get grantType(): string {
    return this._grantType;
  }

  set grantType(grantType: string) {
    this._grantType = grantType;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken;
  }
  
}