import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { RouterModule, Routes }  from '@angular/router';

import { IntroductionModule }    from './introduction/introduction.module';
import { IntroductionComponent } from './introduction/introduction.component';

import { DashboardModule }       from './dashboard/dashboard.module';
import { DashboardComponent }    from './dashboard/dashboard.component';

import { AppComponent }          from './app.component';

const appRoutes: Routes = [
  { path: '', component: IntroductionComponent },
  { path: 'introduction', component: IntroductionComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports:      [
    BrowserModule,
    IntroductionModule,
    DashboardModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
