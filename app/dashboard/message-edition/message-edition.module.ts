import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { MessageEditionComponent } from './message-edition.component';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ MessageEditionComponent ],
  exports: [ MessageEditionComponent ]
})
export class MessageEditionModule {
}
