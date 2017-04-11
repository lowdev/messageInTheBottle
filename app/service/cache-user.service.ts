import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';

import { FacebookUser } from './facebook-me.service';

@Injectable()
export class CacheUser {
  private cachedUser: User;

  getUser(): User {
    return this.cachedUser;
  }

  cacheFacebookUser(facebookUser: FacebookUser) {
    this.cachedUser = new User();
    this.cachedUser.displayName = facebookUser.displayName;
    this.cachedUser.picture = facebookUser.picture;
  }
}

export class User {
  displayName?: string;
  picture?: string;
}
