export class TokenInfo {

  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  scope: string;
  jti: string;

  static fromData(data: string): TokenInfo {
    const dataJson = JSON.parse(data);
    
    let tokenInfo = new this();
    tokenInfo.accessToken = dataJson.access_token;
    tokenInfo.tokenType = dataJson.token_type;
    tokenInfo.refreshToken = dataJson.refresh_token;
    tokenInfo.expiresIn = dataJson.expires_in;
    tokenInfo.scope = dataJson.scope;
    tokenInfo.jti = dataJson.jti;
    return tokenInfo;
  }

}