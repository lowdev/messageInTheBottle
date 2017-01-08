import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Bottle } from './bottle.model'

import 'rxjs/add/operator/toPromise';

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
}
