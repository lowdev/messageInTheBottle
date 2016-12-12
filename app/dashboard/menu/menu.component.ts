import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location }         from '@angular/common';
import { Router }           from '@angular/router';
import { FabActionService } from '../fabAction.service';
import { ViewService }      from '../view.service';

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

  constructor(
    private router: Router,
    private location: Location,
    private fabActionService: FabActionService,
    private viewService: ViewService
  ) {
    fabActionService.actionChanged.subscribe(
      item => {
        console.log("event : " + item['action']);
        let action = item['action'];
        if ("edit" == action) {
          this.isMenuButtonDisplayed = false;
          this.isBackButtonDisplayed = true;
        } else {
          this.isMenuButtonDisplayed = true;
          this.isBackButtonDisplayed = false;
        }
      });
  }

  ngOnInit() {
  }

  logOut() {
    this.router.navigate(['/introduction']);
  }

  gotoIntro() {
    this.router.navigate(['/dashboard']);
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
