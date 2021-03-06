import { Component, OnInit, ElementRef }  from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Animations } from '../../animations';
import { Bottle }     from '../bottle.model';

import { BottleService }      from '../bottle.service';
import { BottleEventService } from '../service/bottle-event.service';

import { Subscription } from "rxjs";
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
  private bottle: Bottle;
  private subscription:Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bottleService: BottleService,
    private bottleEventService: BottleEventService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        if (params['id']) {
          return this.bottleService.getBottle(+params['id']);
        }

        return Promise.resolve(new Bottle());
      })
      .subscribe((bottle: Bottle) => {
        this.bottle = bottle;
        this.bottleEventService.bottleIsInEditMode(this.bottle.id);
      });

    this.bottleEventService.bottleValidated.subscribe(
      event => {
        // Check form
        //this.submitButton.nativeElement.click();
        this.bottleEventService.bottleIsChecked();
      }
    );

    this.subscription = this.bottleEventService.bottleMarkerSaved.subscribe(
      event => {
        this.subscription.unsubscribe();
        this.bottle.lat = event['lat'];
        this.bottle.lng = event['lng'];

        this.bottleService.saveOrUpdate(this.bottle).then(bottle => {
            //this.bottleEventService.bottleIsSaved(bottle);
            this.router.navigate(['/dashboard/message/' + bottle.id]);
        });
      }
    );
  }
}
