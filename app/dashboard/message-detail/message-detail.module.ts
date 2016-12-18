import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { MessageDetailComponent } from './message-detail.component';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ MessageDetailComponent ],
  exports: [ MessageDetailComponent ]
})
export class MessageDetailModule {
}
