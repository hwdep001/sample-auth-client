export class JwtInfo {

  jti: string;
  clientId: string;
  userName: string;
  authorities: string;
  scope: string;
  exp: number;

  static fromData(payload: string): JwtInfo {
    const payloadJson = JSON.parse(payload);
    
    let jwtInfo = new this();
    jwtInfo.jti = payloadJson.jti;
    jwtInfo.clientId = payloadJson.client_id;
    jwtInfo.userName = payloadJson.user_name;
    jwtInfo.authorities = payloadJson.authorities;
    jwtInfo.scope = payloadJson.scope;
    jwtInfo.exp = payloadJson.exp;
    return jwtInfo;
  }
  
}