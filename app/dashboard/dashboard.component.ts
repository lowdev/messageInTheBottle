import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute}   from '@angular/router';

import { AuthService }           from 'ng2-ui-auth';
import { FabActionEventService } from './service/fabAction-event.service';
import { BottleEventService }    from './service/bottle-event.service';
import { ViewService }           from './view.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

declare var Materialize:any;

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  actionButton:string = "add";
  isFullMapView:boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fabActionService: FabActionEventService,
    private bottleEventService: BottleEventService,
    private viewService:ViewService,
    private authService:AuthService
  ) {
    bottleEventService.loadedBottle.subscribe(item => this.actionButton = 'edit');
    fabActionService.actionChanged.subscribe(
      item => { this.actionButton = item['action']; }
    );
    viewService.viewChanged.subscribe(
      item => {
        if (item['view'] == 'map') {
          this.isFullMapView = true;
        }

        if (item['view'] == 'list') {
          this.isFullMapView = false;
        }
      }
    );
  }

  doAction(): void {
    if (!this.authService.isAuthenticated()) {
      Materialize.toast("Vous n'êtes pas connecté &nbsp; <a href='/introduction'>Connexion</a>", 4000);
      return;
    }

    if (this.actionButton == "add") {
      this.router.navigate(['dashboard/bottle/add']);
    }
    if (this.actionButton == "edit") {
      this.router.navigate([this.router.url + '/edit']);
    }
    if (this.actionButton == "done") {
      const url: string = this.router.url;
      this.router.navigate([ url.substring(0, url.lastIndexOf('/'))]);
    }

    this.viewService.changeToListView();
  }
}
