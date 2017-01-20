import { Injectable, EventEmitter } from '@angular/core';
import { Bottle } from '../bottle.model';

@Injectable()
export class BottleEventService {
  loadedBottle: EventEmitter<any> = new EventEmitter();
  bottleInEditMode: EventEmitter<any> = new EventEmitter();
  bottleValidated: EventEmitter<any> = new EventEmitter();
  bottleChecked: EventEmitter<any> = new EventEmitter();
  bottleMarkerSaved: EventEmitter<any> = new EventEmitter();
  bottleSaved: EventEmitter<any> = new EventEmitter();

  bottleIsLoaded(id: number | String): void {
    this.loadedBottle.emit({ "id": id });
  }

  bottleIsInEditMode(): void {
    this.bottleInEditMode.emit();
  }

  bottleIsValidated(): void {
    this.bottleValidated.emit();
  }

  bottleIsChecked(): void {
    this.bottleChecked.emit();
  }

  bottleMarkerIsSaved(marker: any): void {
    this.bottleMarkerSaved.emit({
      "lat" : marker.getPosition().lat(),
      "lng" : marker.getPosition().lng()
    });
  }

  bottleIsSaved(bottle: Bottle): void {
    this.bottleSaved.emit({"bottle" : bottle});
  }
}
