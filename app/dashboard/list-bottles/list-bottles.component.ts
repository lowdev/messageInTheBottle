import { Component, OnInit, Input } from '@angular/core';
import { Animations }               from '../../animations';
import { Bottle }                   from './../bottle.model';
import { BottleService }            from './../bottle.service';
import { FabActionService }         from '../fabAction.service';

@Component({
  moduleId: module.id,
  selector: 'list-bottles',
  providers: [ BottleService ],
  templateUrl: 'list-bottles.component.html',
  styleUrls: ['./list-bottles.component.css'],
  styles: [':host { display: block; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class ListBottlesComponent implements OnInit {
  bottles: Bottle[];

  constructor(
    private service: BottleService,
    private fabActionService: FabActionService
  ) {}

  ngOnInit() {
    this.service.getBottles()
      .then(bottles => {
        this.bottles = bottles;
    });
    this.fabActionService.notifyAdd();
  }
}
