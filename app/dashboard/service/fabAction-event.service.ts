import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FabActionEventService {
  actionChanged: EventEmitter<any> = new EventEmitter();

  notifyValidate(): void {
    this.actionChanged.emit({ "action": "done" });
  }
}
