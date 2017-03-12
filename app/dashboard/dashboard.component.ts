import { Component, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService }           from 'ng2-ui-auth';
import { BottleEventService }    from './service/bottle-event.service';
import { BottlesEventService }   from './service/bottles-event.service';
import { ViewService }           from './view.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

declare var Materialize:any;

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger('signal', [
      state('void', style({
        'transform': 'translateY(-100%)'
      })),
      state('go', style({
        'background-color':'green',
        'height':'100px'
      })),
      state('stop', style({
        'background-color':'red',
        'height':'50px'
      })),
      transition('* => *', animate(500))
    ])
  ],
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  signal;
  isHere = false;
  actionButton:string = "add";
  isFullMapView:boolean = false;

  onGoClick() {
    this.signal = 'go';
  }

  onStopClick() {
    this.signal = 'stop';
  }

  onToggleClick() {
    this.isHere = !this.isHere;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bottleEventService: BottleEventService,
    private bottlesEventService: BottlesEventService,
    private viewService:ViewService,
    private authService:AuthService
  ) {
    bottleEventService.loadedBottle.subscribe(item => this.actionButton = 'edit');
    bottleEventService.bottleInEditMode.subscribe(item => this.actionButton = 'done');
    bottlesEventService.bottlesLoaded.subscribe(item => this.actionButton = 'add');

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

  isLogged() {
    return this.authService.isAuthenticated();
  }

  doAction(): void {
    if (!this.isLogged()) {
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
      this.bottleEventService.bottleIsValidated();
      //const url: string = this.router.url;
      //this.router.navigate([ url.substring(0, url.lastIndexOf('/'))]);
    }

    this.viewService.changeToListView();
  }
}
