import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { ListBottlesComponent } from './list-bottles/list-bottles.component';
import { ViewBottleComponent }  from './view-bottle/view-bottle.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'bottles', component: ListBottlesComponent },
          { path: 'viewBottle', component: ViewBottleComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(dashboardRoutes) ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule { }
