import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BottlesEventService {
  bottlesLoaded: EventEmitter<any> = new EventEmitter();

  notifyBottlesLoaded(): void {
    this.bottlesLoaded.emit();
  }
}
