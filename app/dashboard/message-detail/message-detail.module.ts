import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { CommentModule } from './comment/comment.module';

import { MessageDetailComponent } from './message-detail.component';

@NgModule({
  imports: [ CommonModule, FormsModule, CommentModule ],
  declarations: [ MessageDetailComponent ],
  exports: [ MessageDetailComponent ]
})
export class MessageDetailModule {
}
