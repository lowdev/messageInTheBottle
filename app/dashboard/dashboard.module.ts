import { NgModule, AfterContentInit } from '@angular/core';
import { DashboardComponent }         from './dashboard.component';
import { MaterializeDirective }       from "angular2-materialize";

@NgModule({
  declarations: [ DashboardComponent, MaterializeDirective ],
  exports: [ DashboardComponent ]
})
export class DashboardModule {
}
