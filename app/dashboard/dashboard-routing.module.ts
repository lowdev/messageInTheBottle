import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }      from './dashboard.component';
import { ListBottlesComponent }    from './list-bottles/list-bottles.component';
import { MessageDetailComponent }  from './message-detail/message-detail.component';
import { MessageEditionComponent } from './message-edition/message-edition.component';

import  {AuthGuard } from '../service/auth.guard';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '', redirectTo: 'bottles', pathMatch: 'full' },
          {
            path: 'bottles',
            component: ListBottlesComponent
          },{
            path: 'bottles/admin',
            component: ListBottlesComponent,
            data : { 'admin' : 'true'}
          }, {
            path: 'message/:id',
            component: MessageDetailComponent
          }, {
            path: 'message/:id/edit',
            component: MessageEditionComponent,
            canActivate: [ AuthGuard ]
          }, {
            path: 'bottle/add',
            component: MessageEditionComponent,
            canActivate: [ AuthGuard ]
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
