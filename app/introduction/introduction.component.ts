import { Component } from '@angular/core';
import { Router }    from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'introduction',
  templateUrl: 'introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent {

  constructor(
    private router: Router
  ) {}

  log() {
    this.router.navigate(['/dashboard']);
  }
}
