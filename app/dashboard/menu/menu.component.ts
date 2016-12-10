import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router }                          from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  sidenavActions = new EventEmitter<any>();
  sidenavParams = [];

  constructor(
    private router: Router
  ) {}

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
