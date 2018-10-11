export class JwtInfo {

  jti: string;
  clientId: string;
  userName: string;
  authorities: string;
  scope: string;
  exp: number;

  constructor(payload: string) {
    const payloadJson = JSON.parse(payload);
    this.jti = payloadJson.jti;
    this.clientId = payloadJson.client_id;
    this.userName = payloadJson.user_name;
    this.authorities = payloadJson.authorities;
    this.scope = payloadJson.scope;
    this.exp = payloadJson.exp;
  }
  
}