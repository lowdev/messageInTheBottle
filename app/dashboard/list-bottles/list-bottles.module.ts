import { NgModule }             from '@angular/core';
import { ListBottlesComponent } from './list-bottles.component';
import { BottleCardModule }     from './bottle-card/bottle-card.module';

@NgModule({
  imports: [ BottleCardModule ],
  declarations: [ ListBottlesComponent ],
  exports: [ ListBottlesComponent ]
})
export class ListBottlesModule {
}
