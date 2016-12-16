import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule }           from '@angular/http';

import { MaterializeDirective }          from "angular2-materialize";
import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';

import { IntroductionModule } from './introduction/introduction.module';
import { DashboardModule }    from './dashboard/dashboard.module';

import { Animations }   from './animations';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '',
    redirectTo: '/introduction',
    pathMatch: 'full'
  }
];

export const GOOGLE_CLIENT_ID = '<replace me>';
export const FACEBOOK_CLIENT_ID = '1205205979559321';
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = { 'Content-Type': 'application/json' };
    providers = {
      google: { clientId: GOOGLE_CLIENT_ID },
      facebook: { clientId: FACEBOOK_CLIENT_ID }
   };
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    Ng2UiAuthModule.getWithConfig(MyAuthConfig),
    IntroductionModule,
    DashboardModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ AppComponent ],
  providers: [ Animations ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
