import { NgModule }              from '@angular/core';
import { IntroductionComponent } from './introduction.component';
import { MaterializeDirective }  from 'angular2-materialize';

@NgModule({
  declarations: [
    IntroductionComponent,
    MaterializeDirective
  ],
  exports: [ IntroductionComponent ]
})
export class IntroductionModule { }
