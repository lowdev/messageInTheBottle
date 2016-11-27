import { NgModule }               from '@angular/core';

import { MaterializeDirective }   from "angular2-materialize";
import { AgmCoreModule }          from 'angular2-google-maps/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent }     from './dashboard.component';

import { ListBottlesModule }      from './list-bottles/list-bottles.module';
import { ListBottlesComponent }   from './list-bottles/list-bottles.component';

@NgModule({
  imports: [
    AgmCoreModule.forRoot(),
    ListBottlesModule,
    DashboardRoutingModule
  ],
  declarations: [ DashboardComponent, MaterializeDirective ],
  exports: [ DashboardComponent ]
})
export class DashboardModule {
}
