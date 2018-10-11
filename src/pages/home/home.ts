import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { TokenInfo } from './../../models/TokenInfo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tokenInfo: TokenInfo = new TokenInfo();

  constructor(
    private storage: Storage
  ) {
    this.initData();
  }

  initData(): void {    
    this.storage.get('tokenInfo').then((data: TokenInfo) => {
      this.tokenInfo = data;
    }).catch(err => {
      alert(err);
    });
  }

}
