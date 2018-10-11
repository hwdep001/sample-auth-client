export class TokenInfo {

  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  scope: string;
  jti: string;

  constructor(data: string) {
    const dataJson = JSON.parse(data);
    this.accessToken = dataJson.access_token;
    this.tokenType = dataJson.token_type;
    this.refreshToken = dataJson.refresh_token;
    this.expiresIn = dataJson.expires_in;
    this.scope = dataJson.scope;
    this.jti = dataJson.jti;
  }

}