import { Component, EventEmitter, OnInit } from '@angular/core';
import { Location }                        from '@angular/common';
import { Router }                          from '@angular/router';

import { AuthService } from 'ng2-ui-auth';

import { FabActionService }         from '../fabAction.service';
import { ViewService }              from '../view.service';
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
  isListButtonDisplayed = false;

  facebookUser: FacebookUser;

  constructor(
    private router: Router,
    private location: Location,
    private fabActionService: FabActionService,
    private viewService: ViewService,
    private auth: AuthService,
    private facebookMe: FacebookMe
  ) {
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
      });

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

  gotoIntro() {
    this.router.navigate(['/dashboard']);
  }

  goBack() {
    this.location.back();
  }

  hideMenu(): void {
    this.sidenavParams = ['hide'];
    this.sidenavActions.emit('sideNav');
  }

  switchView(): void {
    this.isMapButtonDisplayed = !this.isMapButtonDisplayed;
    this.isListButtonDisplayed = !this.isListButtonDisplayed;

    if (this.isMapButtonDisplayed) {
      this.viewService.changeToListView();
    }

    if (this.isListButtonDisplayed) {
      this.viewService.changeToMapView();
    }
  }
}
