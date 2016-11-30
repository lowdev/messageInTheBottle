import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { ListBottlesComponent } from './list-bottles/list-bottles.component';
import { MessageDetailComponent }  from './message-detail/message-detail.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'list', component: ListBottlesComponent },
          { path: 'message-detail', component: MessageDetailComponent }
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
