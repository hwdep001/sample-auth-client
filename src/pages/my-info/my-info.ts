import { Component } from '@angular/core';

import { AuthProvider } from './../../providers/Auth';
import { CommonProvider } from './../../providers/Common';

import { JwtInfo } from './../../models/JwtInfo';

@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html'
})
export class MyInfoPage {

  public jtwInfo: JwtInfo;

  constructor(
    private _auth: AuthProvider,
    private _cmn: CommonProvider
  ) {
    this.initData();
  }

  async initData() {
    this.jtwInfo = await this._auth.getJwtInfo();
    console.log(this.jtwInfo);
  }

  signOut(): void {
    const loader = this._cmn.getLoader(null, 30000, true);
    loader.present();

    this._auth.signOut();
  }

}
