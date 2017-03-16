import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';
import { Comment }          from '../../comment.model';

@Component({
  moduleId: module.id,
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment: Comment;

  constructor(
    private router: Router
  ) {}
}
