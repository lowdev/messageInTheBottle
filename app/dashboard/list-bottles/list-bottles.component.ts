import { Component, Input } from '@angular/core';
import { Animations }       from '../../animations';

@Component({
  moduleId: module.id,
  selector: 'list-bottles',
  templateUrl: 'list-bottles.component.html',
  styles: [':host { display: block; position: absolute; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class ListBottlesComponent {
}
