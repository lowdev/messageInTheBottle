import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { CommentModule } from './comment/comment.module';

import { MessageDetailComponent } from './message-detail.component';

import { CommentService } from './comment.service';

@NgModule({
  imports: [ CommonModule, FormsModule, CommentModule ],
  declarations: [ MessageDetailComponent ],
  exports: [ MessageDetailComponent ],
  providers: [ CommentService ]
})
export class MessageDetailModule {
}
