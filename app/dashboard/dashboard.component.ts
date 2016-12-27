import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute}   from '@angular/router';

import { FabActionService } from './fabAction.service';
import { ViewService }      from './view.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

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
    private fabActionService: FabActionService,
    private viewService:ViewService
  ) {
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
  }
}
