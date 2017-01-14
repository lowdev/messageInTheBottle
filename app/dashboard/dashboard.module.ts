import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';

import { MaterializeDirective }   from "angular2-materialize";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent }     from './dashboard.component';

import { MenuModule }           from './menu/menu.module';
import { ListBottlesModule }    from './list-bottles/list-bottles.module';
import { MessageDetailModule }  from './message-detail/message-detail.module';
import { MessageEditionModule } from './message-edition/message-edition.module';
import { MapModule }            from './map/map.module';

import { BottleService }         from './bottle.service';
import { FabActionEventService } from './service/fabAction-event.service';
import { BottleEventService }    from './service/bottle-event.service';
import { BottlesEventService }   from './service/bottles-event.service';
import { ViewService }           from './view.service';
import { AuthGuard }             from '../service/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ListBottlesModule,
    DashboardRoutingModule,
    MessageDetailModule,
    MenuModule,
    MessageEditionModule,
    MapModule
  ],
  declarations: [ DashboardComponent ],
  exports: [ DashboardComponent ],
  providers: [
    BottleService, ViewService, AuthGuard,
    BottleEventService, BottlesEventService, FabActionEventService
  ]
})
export class DashboardModule {
}
