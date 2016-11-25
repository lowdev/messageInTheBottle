import { NgModule }             from '@angular/core';
import { BottleCardComponent }  from './bottle-card.component';
import { MaterializeDirective } from "angular2-materialize";

@NgModule({
  declarations: [ BottleCardComponent ],
  exports: [ BottleCardComponent ]
})
export class BottleCardModule {
}
