import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { MessageDetailComponent } from './message-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ MessageDetailComponent ],
  exports: [ MessageDetailComponent ]
})
export class MessageDetailModule {
}
