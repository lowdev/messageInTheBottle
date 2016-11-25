import { NgModule }             from '@angular/core';
import { DashboardComponent }   from './dashboard.component';
import { MaterializeDirective } from "angular2-materialize";
import { AgmCoreModule }        from 'angular2-google-maps/core';
import { BottleCardComponent }  from './bottle-card/bottle-card.component';
import { BottleCardModule }     from './bottle-card/bottle-card.module';

@NgModule({
  imports: [ AgmCoreModule.forRoot(), BottleCardModule ],
  declarations: [ DashboardComponent, MaterializeDirective ],
  exports: [ DashboardComponent ]
})
export class DashboardModule {
}
