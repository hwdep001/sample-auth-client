import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AuthProvider } from './../../providers/Auth';
import { ItemProvider } from './../../providers/Item';

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

  constructor(
    private storage: Storage,
    private authService: AuthProvider,
    private itemService: ItemProvider
  ) {
    this.initData();
  }

  initData(): void {    
    this.getTokenInfo();
    this.getItems();
    this.getTokenExp();
    this.checkExp();
  }

  private getTokenInfo(): void {
    this.storage.get('tokenInfo').then((data: TokenInfo) => {
      this.tokenInfo = data;
    }).catch(err => {
      alert(err);
    });
  }

  private getItems(): void {
    this.itemService.getItemList().then(data => {
      this.items = data;
    }).catch(err => {
      alert(err);
    });
  }

  private async getTokenExp(): Promise<void> {
    const jtwInfo = await this.authService.getJwtInfo();
    let tokenDate: Date = new Date(0);
    tokenDate.setUTCSeconds(jtwInfo.exp);
    this.tokenExp = tokenDate.getTime();
  }
  
  private checkExp() {
    let interval = setInterval(() => {
      if(new Date().getTime() > this.tokenExp) {
        this.isExpired = true;
        clearInterval(interval);
      }
    }, 1000);
  }
  
}
