import { Component, EventEmitter } from '@angular/core';
import { Location }                from '@angular/common';
import { Router }                  from '@angular/router';

import { AuthService } from 'ng2-ui-auth';

import { FabActionService } from '../fabAction.service';
import { ViewService }      from '../view.service';

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

  isMapButtonDisplayed = true;
  isListButtonDisplayed = false;

  constructor(
    private router: Router,
    private location: Location,
    private fabActionService: FabActionService,
    private viewService: ViewService,
    private auth: AuthService
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
  }

  logOut() {
    this.auth.logout()
      .subscribe({
        error: (err: any) => console.log(err),
        complete: () => this.router.navigate(['/introduction'])
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
