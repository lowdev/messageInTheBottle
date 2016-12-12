import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterializeDirective } from "angular2-materialize";

@NgModule({
  imports: [ CommonModule],
  declarations: [ MenuComponent, MaterializeDirective ],
  exports: [ MenuComponent ]
})
export class MenuModule {
}
