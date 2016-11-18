import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { IntroductionModule } from './introduction/introduction.module';
import { AppComponent }       from './app.component';
import { MDL }                from './material-design-lite-upgrade-element.directive';

@NgModule({
  imports:      [ BrowserModule, IntroductionModule ],
  declarations: [ AppComponent, MDL ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
