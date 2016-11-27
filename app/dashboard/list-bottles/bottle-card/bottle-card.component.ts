import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bottle-card',
  templateUrl: 'bottle-card.component.html',
  styleUrls: ['./bottle-card.component.css']
})
export class BottleCardComponent {
  @Input() title: string;
}
