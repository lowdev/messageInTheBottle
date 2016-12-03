import { Injectable } from '@angular/core';
import { Bottle }     from './bottle.model'

let BOTTLES = [
  new Bottle(11, 'Besoin d\'eau'),
  new Bottle(12, 'Vêtement chaud'),
  new Bottle(13, 'Bonnet'),
  new Bottle(14, 'Chocolat chaud !'),
  new Bottle(15, 'Livre comique')
];
let bottlesPromise = Promise.resolve(BOTTLES);

@Injectable()
export class BottleService {
  getBottles(): Promise<Bottle[]> {
    return bottlesPromise;
  }
  getBottle(id: number | string): Promise<Bottle> {
    return bottlesPromise
      .then(bottles => bottles.find(bottle => bottle.id === +id));
  }
}
