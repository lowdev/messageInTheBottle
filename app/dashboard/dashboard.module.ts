import { NgModule }               from '@angular/core';

import { MaterializeDirective }   from "angular2-materialize";
import { AgmCoreModule }          from 'angular2-google-maps/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent }     from './dashboard.component';

import { MenuModule }             from './menu/menu.module';
import { ListBottlesModule }      from './list-bottles/list-bottles.module';
import { MessageDetailModule }    from './message-detail/message-detail.module';

import { FabActionService }       from './fabAction.service';

@NgModule({
  imports: [
    AgmCoreModule.forRoot(),
    ListBottlesModule,
    DashboardRoutingModule,
    MessageDetailModule,
    MenuModule
  ],
  declarations: [ DashboardComponent ],
  exports: [ DashboardComponent ],
  providers: [ FabActionService ]
})
export class DashboardModule {
}
