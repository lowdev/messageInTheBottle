import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterializeDirective } from "angular2-materialize";
import { FacebookMe } from '../../service/facebook-me.service';

@NgModule({
  imports: [ CommonModule],
  declarations: [ MenuComponent, MaterializeDirective ],
  exports: [ MenuComponent ],
  providers: [ FacebookMe ]
})
export class MenuModule {
}
