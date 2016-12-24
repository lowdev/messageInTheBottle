import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';

import { AuthService } from 'ng2-ui-auth';

@Injectable()
export class FacebookMe {
  constructor (
    private http: Http,
    private auth:AuthService) { }

  getUser(): Observable<FacebookUser> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = this.auth.getToken();
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http.get("/user/facebook", { headers })
                    .map(this.extractData);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}

export interface FacebookUser {

}
