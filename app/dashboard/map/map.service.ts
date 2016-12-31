import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MapService {
  markerRequested: EventEmitter<any> = new EventEmitter();

  loadMarker(id: number | String): void {
    this.markerRequested.emit({ "id": id });
  }
}
