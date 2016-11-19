import { Component, AfterContentInit } from '@angular/core';
declare var $:any;
declare var demo:any;

@Component({
  moduleId: module.id,
  selector: 'introduction',
  templateUrl: 'introduction.component.html'
})
export class IntroductionComponent implements AfterContentInit {

  ngAfterContentInit() {
    demo.checkFullPageBackgroundImage();

    setTimeout(function() {
        // after 1000 ms we add the class animated to the login/register card
        $('.card').removeClass('card-hidden');
    }, 700);
  }
}
