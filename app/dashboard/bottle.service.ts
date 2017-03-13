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
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get("/bottle/" + id, { headers })
                    .map(res => res.json())
                    .toPromise();
  }

  saveOrUpdate(bottle: Bottle): Promise<Bottle> {
    if (Bottle.NEW_ID == bottle.id) {
      return this.save(bottle);
    }

    return this.update(bottle);
  }

  private save(bottle: Bottle): Promise<Bottle> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("/bottle", JSON.stringify(bottle), { headers })
           .map(res => res.json())
           .toPromise();
  }

  private update(bottle: Bottle): Promise<Bottle> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("/bottle", JSON.stringify(bottle), { headers })
           .map(res => res.json())
           .toPromise();
  }
}
