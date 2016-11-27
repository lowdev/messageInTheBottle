import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { RouterModule, Routes }  from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";

import { IntroductionModule }    from './introduction/introduction.module';
import { IntroductionComponent } from './introduction/introduction.component';

import { DashboardModule }       from './dashboard/dashboard.module';

import { Animations }            from './animations';
import { AppComponent }          from './app.component';

const appRoutes: Routes = [
  { path: '', component: IntroductionComponent }
];

@NgModule({
  imports:      [
    BrowserModule,
    IntroductionModule,
    DashboardModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ AppComponent ],
  providers: [ Animations ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
