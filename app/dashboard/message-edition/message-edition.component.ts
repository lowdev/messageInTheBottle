import { Component, OnInit, Input,
          EventEmitter, Output }    from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Animations }               from '../../animations';
import { Bottle }                   from '../bottle.model';

import { BottleService }    from '../bottle.service';
import { FabActionService } from '../fabAction.service';
import { ViewService }      from '../view.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'message-edition',
  templateUrl: 'message-edition.component.html',
  styles: [':host { display: block; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class MessageEditionComponent implements OnInit {
  bottle: Bottle;
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bottleService: BottleService,
    private fabActionService: FabActionService,
    private viewService: ViewService
  ) {
    viewService.viewChanged.subscribe(
      item => {
        console.log("message-detail: " + item['view']);
        if (item['view'] == 'edit') {
          fabActionService.notifyValidate();
          this.isEditMode = true;
        }
        if (item['view'] == 'detail') {
          this.isEditMode = false;
        }
      }
    );
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.bottleService.getBottle(+params['id']))
      .subscribe((bottle: Bottle) => {
        this.bottle = bottle;
      });
    this.fabActionService.notifyValidate();
  }
}
