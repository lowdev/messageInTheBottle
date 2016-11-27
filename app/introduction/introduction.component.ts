import { Component }  from '@angular/core';
import { Router }     from '@angular/router';
import { Animations } from '../animations';

@Component({
  moduleId: module.id,
  selector: 'introduction',
  templateUrl: 'introduction.component.html',
  styleUrls: ['./introduction.component.css'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class IntroductionComponent {

  constructor(
    private router: Router
  ) {}

  log() {
    this.router.navigate(['/bottles']);
  }
}
