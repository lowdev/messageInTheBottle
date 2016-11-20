import { NgModule, AfterContentInit } from '@angular/core';
import { DashboardComponent }         from './dashboard.component';
declare var demo:any;

@NgModule({
  declarations: [ DashboardComponent ],
  exports: [ DashboardComponent ]
})
export class DashboardModule implements AfterContentInit {
  ngAfterContentInit() {
    console.log('dashboard init');
    demo.init();
  }
}
