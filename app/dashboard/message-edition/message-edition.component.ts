import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Animations } from '../../animations';
import { Bottle }     from '../bottle.model';

import { BottleService }      from '../bottle.service';
import { BottleEventService } from '../service/bottle-event.service';

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
  //@ViewChild('submitButton') submitButton:ElementRef;
  bottle: Bottle;

  constructor(
    private route: ActivatedRoute,
    private bottleService: BottleService,
    private bottleEventService: BottleEventService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.bottleService.getBottle(+params['id']))
      .subscribe((bottle: Bottle) => {
        this.bottle = bottle;
        if (!bottle) {
          this.bottle = new Bottle();
        }
        this.bottleEventService.bottleIsInEditMode();
      });

    this.bottleEventService.bottleValidated.subscribe(
      event => {
        // Check form
        //this.submitButton.nativeElement.click();
        this.bottleEventService.bottleIsChecked();
      }
    );

    this.bottleEventService.bottleMarkerSaved.subscribe(
      event => {
        this.bottle.lat = event['lat'];
        this.bottle.lng = event['lng'];
        this.bottleService.save(this.bottle);
        this.bottleEventService.bottleIsSaved(this.bottle);
      }
    );
  }

  submit(): void {
  }
}
