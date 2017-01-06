import { NgModule }      from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { CommonModule }  from '@angular/common';

import { StyledMap }    from './styled-map.component';
import { MapComponent } from './map.component';

import { MarkerService } from './marker.service';
import { MapService }    from './map.service';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCWxUOA9ABkBxvPIQe3VFOhukW1eUM1isE' }),
  ],
  declarations: [ MapComponent, StyledMap ],
  exports: [ MapComponent ],
  providers: [ MarkerService, MapService ]
})
export class MapModule {
}
