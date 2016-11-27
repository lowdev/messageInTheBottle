import { NgModule }               from '@angular/core';

import { MaterializeDirective }   from "angular2-materialize";
import { AgmCoreModule }          from 'angular2-google-maps/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent }     from './dashboard.component';

import { ListBottlesModule }      from './list-bottles/list-bottles.module';
import { ViewBottleModule }       from './view-bottle/view-bottle.module';

@NgModule({
  imports: [
    AgmCoreModule.forRoot(),
    ListBottlesModule,
    DashboardRoutingModule,
    ViewBottleModule
  ],
  declarations: [ DashboardComponent, MaterializeDirective ],
  exports: [ DashboardComponent ]
})
export class DashboardModule {
}
