import { NgModule }   from '@angular/core';
import { HttpModule } from '@angular/http';
import { IntroductionComponent } from './introduction.component';
import { IntroductionRoutingModule } from './introduction-routing.module';

import { AuthService } from 'ng2-ui-auth';

import { CacheUser } from '../service/cache-user.service';

@NgModule({
  imports: [ IntroductionRoutingModule ],
  declarations: [ IntroductionComponent ],
  exports: [ IntroductionComponent ],
  providers: [ AuthService, CacheUser ]
})
export class IntroductionModule { }
