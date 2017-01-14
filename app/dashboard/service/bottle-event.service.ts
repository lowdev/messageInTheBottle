import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BottleEventService {
  loadedBottle: EventEmitter<any> = new EventEmitter();

  bottleIsLoaded(id: number | String): void {
    this.loadedBottle.emit({ "id": id });
  }
}
