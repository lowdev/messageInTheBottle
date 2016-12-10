import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location }         from '@angular/common';
import { Router }           from '@angular/router';
import { FabActionService } from '../fabAction.service';

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

  constructor(
    private router: Router,
    private location: Location,
    private fabActionService: FabActionService
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
}
