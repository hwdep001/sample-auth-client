import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AuthProvider } from './../../providers/Auth';
import { ItemProvider } from './../../providers/Item';

import { ResponseData } from './../../models/ResponseData';
import { TokenInfo } from './../../models/TokenInfo';
import { Item } from './../../models/Item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tokenInfo = new TokenInfo();
  public items = new Array<Item>();
  public tokenExp: number;
  public isExpired: boolean = false;
  private checkExpInterval;

  constructor(
    private storage: Storage,
    private authService: AuthProvider,
    private itemService: ItemProvider
  ) {
    this.initData();
  }

  ionViewWillLeave() {
    clearInterval(this.checkExpInterval);
  }

  initData(): void {    
    clearInterval(this.checkExpInterval);
    this.getTokenInfo();
    this.getItems();
  }

  private getTokenInfo(): void {
    this.storage.get('tokenInfo').then((data: TokenInfo) => {
      this.tokenInfo = data;
      this.getTokenExp();
    });
  }

  private getItems(): void {
    this.itemService.getItemList().then(data => {
      this.items = data;
    }).catch((err) => {
      alert(err);
    });
  }

  private async getTokenExp(): Promise<void> {
    const jtwInfo = await this.authService.getJwtInfo();
    let tokenDate: Date = new Date(0);
    tokenDate.setUTCSeconds(jtwInfo.exp);
    this.tokenExp = tokenDate.getTime();
    this.checkExp();
  }
  
  private checkExp() {
    this.isExpired = false;
    clearInterval(this.checkExpInterval);

    this.checkExpInterval = setInterval(() => {
      console.log("ckeckExp")
      if(new Date().getTime() > this.tokenExp) {
        this.isExpired = true;
        clearInterval(this.checkExpInterval);
      }
    }, 1000);
  }
  
  refreshToken() {
    this.authService.refreshToken().then((data:TokenInfo) => {
      this.tokenInfo = data;
      this.getTokenExp();
    }).catch((err) => {
      alert(err);
    })
  }
}
