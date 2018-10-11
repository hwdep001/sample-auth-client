import { Component } from '@angular/core';

import { CommonProvider } from './../../providers/Common';
import { ItemProvider } from './../../providers/Item';

import { Item } from './../../models/Item';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  public items: Array<Item>;

  constructor(
    private cmnService: CommonProvider,
    private itemService: ItemProvider
  ) {
    // this.initData();
  }

  initData(): void {
    this.search();
  }

  search(): void {
    const loader = this.cmnService.getLoader();
    loader.present();

    // this.itemService.getItemList().then(items => {
    //   this.items = items;
    //   loader.dismiss();

    // }).catch(err => {
    //   loader.dismiss();
    //   console.log(err);
    //   alert(JSON.stringify(err));
    // });
  }

}
