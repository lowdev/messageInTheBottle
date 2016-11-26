import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bottle-card',
  templateUrl: 'bottle-card.component.html'
})
export class BottleCardComponent {
  @Input() title: string;
}
