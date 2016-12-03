import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';
import { Bottle }           from '../../bottle.model';

@Component({
  moduleId: module.id,
  selector: 'bottle-card',
  templateUrl: 'bottle-card.component.html',
  styleUrls: ['./bottle-card.component.css']
})
export class BottleCardComponent {
  @Input() bottle: Bottle;

  constructor(
    private router: Router
  ) {}

  displayDetail() {
    this.router.navigate(['/dashboard/message/' + this.bottle.id]);
  }
}
