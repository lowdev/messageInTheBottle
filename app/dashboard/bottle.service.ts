import { Injectable } from '@angular/core';
import { Bottle }     from './bottle.model'

let BOTTLES: Bottle[] = [
  {
    id: 11,
    title: 'Besoin d\'eau',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...lacus eleifend lacinia... go!'
  },
  {
    id: 12,
    title: 'Chocolat chaud !',
    description: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
  },
  {
    id: 13,
    title: 'Vêtement chaud',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis'
  },
  {
    id: 14,
    title: 'Bonnet',
    description: ' dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore'
  },
  {
    id: 15,
    title: 'Livre',
    description: ' quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio'
  }
]

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
