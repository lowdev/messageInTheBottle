import { Component, EventEmitter } from '@angular/core';
import { Location }                from '@angular/common';
import { Router }                  from '@angular/router';

import { AuthService } from 'ng2-ui-auth';

import { ViewService }         from '../view.service';
import { BottleEventService }  from '../service/bottle-event.service';
import { BottlesEventService } from '../service/bottles-event.service';
import { CacheUser, User }     from '../../service/cache-user.service';

@Component({
  moduleId: module.id,
  selector: 'menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  sidenavActions = new EventEmitter<any>();
  sidenavParams = [];
  isMenuButtonDisplayed = true;
  isBackButtonDisplayed = false;

  isMapButtonDisplayed = false;

  facebookUser: User;

  constructor(
    private router: Router,
    private location: Location,
    private viewService: ViewService,
    private auth: AuthService,
    private cacheUser: CacheUser,
    private bottlesEventService: BottlesEventService,
    private bottleEventService: BottleEventService
  ) {
    bottleEventService.loadedBottle.subscribe(
      item => {
        this.isMenuButtonDisplayed = false;
        this.isBackButtonDisplayed = true;
      }
    );
    bottleEventService.bottleInEditMode.subscribe(
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

    this.facebookUser = cacheUser.getUser();
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
