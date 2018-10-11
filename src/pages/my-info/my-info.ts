import { Component } from '@angular/core';

import { CommonProvider } from './../../providers/Common';
import { AuthProvider } from './../../providers/Auth';

import { JwtInfo } from './../../models/JwtInfo';

@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html'
})
export class MyInfoPage {

  public jtwInfo: JwtInfo = new JwtInfo();

  constructor(
    private authService: AuthProvider,
    private cmnService: CommonProvider
  ) {
    this.initData();
  }

  async initData() {
    this.jtwInfo = await this.authService.getJwtInfo();
  }

  signOut(): void {
    const loader = this.cmnService.getLoader(null, 30000, true);
    loader.present();

    this.authService.signOut();
  }

}
