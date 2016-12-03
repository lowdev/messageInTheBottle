import { Injectable } from '@angular/core';

export class Bottle {
  constructor(public id: number, public title: string) { }
}

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
}
