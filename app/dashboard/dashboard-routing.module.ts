import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { ListBottlesComponent } from './list-bottles/list-bottles.component';
import { MessageDetailComponent }  from './message-detail/message-detail.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'bottles', pathMatch: 'full' },
          { path: 'bottles', component: ListBottlesComponent },
          {
            path: 'message/:id',
            component: MessageDetailComponent
          }
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
