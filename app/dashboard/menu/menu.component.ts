import { Component, EventEmitter, OnInit } from '@angular/core';
import { Location }                        from '@angular/common';
import { Router }                          from '@angular/router';

import { AuthService } from 'ng2-ui-auth';

import { FabActionEventService }    from './../service/fabAction-event.service';
import { ViewService }              from '../view.service';
import { BottleEventService }       from '../service/bottle-event.service';
import { BottlesEventService }      from '../service/bottles-event.service';
import { FacebookMe, FacebookUser } from '../../service/facebook-me.service';

@Component({
  moduleId: module.id,
  selector: 'menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  sidenavActions = new EventEmitter<any>();
  sidenavParams = [];
  isMenuButtonDisplayed = true;
  isBackButtonDisplayed = false;

  isMapButtonDisplayed = true;

  facebookUser: FacebookUser;

  constructor(
    private router: Router,
    private location: Location,
    private fabActionService: FabActionEventService,
    private viewService: ViewService,
    private auth: AuthService,
    private facebookMe: FacebookMe,
    private bottlesEventService: BottlesEventService,
    private bottleEventService: BottleEventService
  ) {
    bottleEventService.loadedBottle.subscribe(
      item => {
        this.isMenuButtonDisplayed = false;
        this.isBackButtonDisplayed = true;
      }
    );
    bottlesEventService.bottlesLoaded.subscribe(
      item => {
        this.isMenuButtonDisplayed = true;
        this.isBackButtonDisplayed = false;
      }
    );
    fabActionService.actionChanged.subscribe(
      item => {
        let action = item['action'];
        if ("add" == action) {
          this.isMenuButtonDisplayed = true;
          this.isBackButtonDisplayed = false;
        } else {
          this.isMenuButtonDisplayed = false;
          this.isBackButtonDisplayed = true;
        }
      }
    );

    viewService.viewChanged.subscribe(
      item => {
        if (item['view'] == 'map') {
          this.isMapButtonDisplayed = false;
        }

        if (item['view'] == 'list') {
          this.isMapButtonDisplayed = true;
        }
      }
    );

    if (this.auth.isAuthenticated()) {
      this.facebookMe.getUser().subscribe(
        facebookUser => this.facebookUser = facebookUser
      );
    }
  }

  ngOnInit() {
  }

  logOut() {
    this.auth.logout().subscribe({
      error: (err: any) => console.log(err),
      complete: () => {
        this.facebookUser = null;
        this.router.navigate(['/introduction']);
      }
    });
  }

  isLogged() {
    return this.auth.isAuthenticated();
  }

  gotoHome() {
    this.router.navigate(['/dashboard']);
  }

  gotoLogin() {
    this.router.navigate(['/introduction']);
  }

  goBack() {
    this.location.back();
  }

  hideMenu(): void {
    this.sidenavParams = ['hide'];
    this.sidenavActions.emit('sideNav');
  }

  switchView(): void {
    if (!this.isMapButtonDisplayed) {
      this.viewService.changeToListView();
    } else {
      this.viewService.changeToMapView();
    }
  }
}
