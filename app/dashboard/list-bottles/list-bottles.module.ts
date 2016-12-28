import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ListBottlesComponent } from './list-bottles.component';
import { BottleCardModule }     from './bottle-card/bottle-card.module';
import { BottleService }        from './../bottle.service';

@NgModule({
  imports: [ CommonModule, BottleCardModule ],
  declarations: [ ListBottlesComponent ],
  exports: [ ListBottlesComponent ],
  providers: [ BottleService ]
})
export class ListBottlesModule {
}
