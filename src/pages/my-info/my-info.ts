import { Component } from '@angular/core';

import { AuthProvider } from './../../providers/Auth';

import { JwtInfo } from './../../models/JwtInfo';

@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html'
})
export class MyInfoPage {

  public jtwInfo: JwtInfo;

  constructor(
    private _auth: AuthProvider
  ) {
    this.initData();
  }

  async initData() {
    this.jtwInfo = new JwtInfo();
    this.jtwInfo = await this._auth.getJwtInfo();
    console.log(this.jtwInfo);
  }

  signOut(): void {
    this._auth.signOut();
  }

}
