export class ReqTokenInfo {

  clientId: string;
  clientSecret: string;
  grantType: string;
  username: string;
  password: string;
  refreshToken: string;

  getBasicAuthorization(): string {
    return 'Basic ' + btoa(this.clientId + ":" + this.clientSecret);
  }
  
}