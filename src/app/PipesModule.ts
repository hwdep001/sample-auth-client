import { NgModule } from '@angular/core';

import { Milliseconds } from './../pipes/milliseconds';

@NgModule({
  declarations: [
    Milliseconds,
  ],
  imports: [

  ],
  exports: [
    Milliseconds
  ]
})
export class PipesModule { }