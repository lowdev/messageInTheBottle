import { Component, OnInit, Input,
          EventEmitter, Output }    from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Animations }               from '../../animations';
import { Bottle }                   from '../bottle.model';
import { Comment }                  from '../comment.model';

import { BottleService }      from '../bottle.service';
import { MarkerService }      from '../map/marker.service';
import { BottleEventService } from '../service/bottle-event.service';
import { CacheUser, User }    from '../../service/cache-user.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'message-detail',
  templateUrl: 'message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
  styles: [':host { display: block; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class MessageDetailComponent implements OnInit {
  user: User;
  bottle: Bottle;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private bottleService: BottleService,
    private markerService: MarkerService,
    private bottleEventService: BottleEventService,
    private cacheUser: CacheUser
  ) {
    this.user = cacheUser.getUser();
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.bottleService.getBottle(+params['id']))
      .subscribe((bottle: Bottle) => {
        this.bottle = bottle;
        this.comments = bottle.comments;
        this.bottleEventService.bottleIsLoaded(bottle.id);
      });
  }

  hasComment():boolean {
    return this.comments.length > 0;
  }

  addNewComment(newComment: string) {
    let comment: Comment = new Comment();
    comment.name = this.user.displayName;
    comment.image_url = this.user.picture;
    comment.date = "Maintenant";
    comment.message = newComment;

    this.comments.push(comment);
  }
}
