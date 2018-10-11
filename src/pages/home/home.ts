import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TokenInfo } from './../../models/TokenInfo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tokenInfo: TokenInfo;

  constructor(
    public navCtrl: NavController,
    private storage: Storage
  ) {
    this.initData();
  }

  initData(): void {    
    this.tokenInfo = null;

    this.storage.get('tokenInfo').then((data: TokenInfo) => {
      this.tokenInfo = data;
    }).catch(err => {
      alert(err);
    });
  }

}
