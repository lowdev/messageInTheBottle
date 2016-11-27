import { NgModule }              from '@angular/core';
import { IntroductionComponent } from './introduction.component';
import { IntroductionRoutingModule } from './introduction-routing.module';

@NgModule({
  imports: [ IntroductionRoutingModule ],
  declarations: [ IntroductionComponent ],
  exports: [ IntroductionComponent ]
})
export class IntroductionModule { }
