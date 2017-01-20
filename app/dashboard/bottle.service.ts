import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Bottle } from './bottle.model'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class BottleService {
  constructor (
    private http: Http) { }

  getBottles(): Promise<Bottle[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get("/bottles", { headers })
                    .map(res => res.json())
                    .toPromise();
  }

  getBottle(id: number | string): Promise<Bottle> {
    return this.getBottles()
      .then(bottles => bottles.find(bottle => bottle.id === +id));
  }

  save(bottle: Bottle): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post("/bottle", JSON.stringify(bottle), { headers })
             .map(this.extractData)
             .catch(this.handleError)
             .toPromise();
  }

  private extractData(res: Response) {
    console.log("extractData");
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    console.log("handleError");
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
