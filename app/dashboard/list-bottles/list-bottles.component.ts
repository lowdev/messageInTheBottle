import { Component, OnInit, Input } from '@angular/core';
import { Animations }               from '../../animations';
import { Bottle, BottleService }    from './bottle.service';
import { Observable }               from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'list-bottles',
  providers: [ BottleService ],
  templateUrl: 'list-bottles.component.html',
  styles: [':host { display: block; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class ListBottlesComponent implements OnInit {
  bottles: Bottle[];

  constructor(
    private service: BottleService
  ) {}

  ngOnInit() {
    this.service.getBottles()
      .then(bottles => {
        this.bottles = bottles;
    });
  }
}
