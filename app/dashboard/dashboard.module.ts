import { NgModule }             from '@angular/core';
import { DashboardComponent }   from './dashboard.component';
import { MaterializeDirective } from "angular2-materialize";
import { AgmCoreModule }        from 'angular2-google-maps/core';
import { BottleCardModule }     from './list-bottles/bottle-card/bottle-card.module';
import { ListBottlesModule }    from './list-bottles/list-bottles.module';

@NgModule({
  imports: [ AgmCoreModule.forRoot(), ListBottlesModule, BottleCardModule ],
  declarations: [ DashboardComponent, MaterializeDirective ],
  exports: [ DashboardComponent ]
})
export class DashboardModule {
}
