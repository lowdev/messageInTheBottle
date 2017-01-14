import { Component, OnInit, Input,
          EventEmitter, Output }    from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Animations }               from '../../animations';
import { Bottle }                   from '../bottle.model';

import { BottleService }    from '../bottle.service';
import { MarkerService }    from '../map/marker.service';
import { BottleEventService }    from '../service/bottle-event.service';
import { FabActionEventService } from './../service/fabAction-event.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'message-detail',
  templateUrl: 'message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
  styles: [':host { display: block; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class MessageDetailComponent implements OnInit {
  bottle: Bottle;

  constructor(
    private route: ActivatedRoute,
    private bottleService: BottleService,
    private fabActionService: FabActionEventService,
    private markerService: MarkerService,
    private bottleEventService: BottleEventService
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.bottleService.getBottle(+params['id']))
      .subscribe((bottle: Bottle) => {
        this.bottle = bottle;
        this.bottleEventService.bottleIsLoaded(bottle.id);
      });
    this.fabActionService.notifyEdit();
  }
}
