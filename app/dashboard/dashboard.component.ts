import { Component, AfterContentInit } from '@angular/core';
declare var $:any;
declare var demo:any;

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements AfterContentInit {
  ngAfterContentInit() {
    demo.init();
    demo.checkFullPageBackgroundImage();

    setTimeout(function() {
        // after 1000 ms we add the class animated to the login/register card
        $('.card').removeClass('card-hidden');
    }, 700);
  }
}
