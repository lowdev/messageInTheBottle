import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { IntroductionComponent } from './introduction.component';

const introductionRoutes: Routes = [
  { path: 'introduction',  component: IntroductionComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(introductionRoutes) ],
  exports: [ RouterModule ]
})
export class IntroductionRoutingModule { }
