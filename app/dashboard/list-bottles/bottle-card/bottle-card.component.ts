import { Component, Input } from '@angular/core';
import { Router }           from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bottle-card',
  templateUrl: 'bottle-card.component.html',
  styleUrls: ['./bottle-card.component.css']
})
export class BottleCardComponent {
  @Input() title: string;

  constructor(
    private router: Router
  ) {}

  displayDetail() {
    this.router.navigate(['/message-detail']);
  }
}
