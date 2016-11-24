import { NgModule, AfterContentInit } from '@angular/core';
import { DashboardComponent }         from './dashboard.component';
import { MaterializeDirective }       from "angular2-materialize";
import { AgmCoreModule }              from 'angular2-google-maps/core';

@NgModule({
  imports: [AgmCoreModule.forRoot()],
  declarations: [ DashboardComponent, MaterializeDirective ],
  exports: [ DashboardComponent ]
})
export class DashboardModule {
}
