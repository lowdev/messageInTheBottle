import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ViewService {
  viewChanged: EventEmitter<any> = new EventEmitter();

  changeToMapView(): void {
    this.viewChanged.emit({ "view": "map" });
  }

  changeToListView(): void {
    this.viewChanged.emit({ "view": "list" });
  }
}
