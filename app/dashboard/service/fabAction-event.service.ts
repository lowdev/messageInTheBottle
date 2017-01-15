import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FabActionEventService {
  actionChanged: EventEmitter<any> = new EventEmitter();

  notifyAdd(): void {
    this.actionChanged.emit({ "action": "add" });
  }

  notifyValidate(): void {
    this.actionChanged.emit({ "action": "done" });
  }
}
