import { NgModule }   from '@angular/core';
import { HttpModule } from '@angular/http';
import { IntroductionComponent } from './introduction.component';
import { IntroductionRoutingModule } from './introduction-routing.module';

import { AuthService } from 'ng2-ui-auth';

@NgModule({
  imports: [ IntroductionRoutingModule ],
  declarations: [ IntroductionComponent ],
  exports: [ IntroductionComponent ],
  providers: [ AuthService ]
})
export class IntroductionModule { }
