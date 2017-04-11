import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Comment } from '../comment.model'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommentService {
  constructor (private http: Http) { }

  public save(comment: Comment): Promise<Comment> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("/comment", JSON.stringify(comment), { headers })
           .map(res => res.json())
           .toPromise();
  }
}
