import { Component, Input } from '@angular/core';
import { Animations } from '../../animations';

@Component({
  moduleId: module.id,
  selector: 'message-detail',
  templateUrl: 'message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
  styles: [':host { display: block; }'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class MessageDetailComponent {
  @Input() title: string;
}
