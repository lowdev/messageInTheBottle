import { Injectable } from '@angular/core';
import { Marker }     from './marker.model'

let MARKERS: Marker[] = [
  {
    id: 11,
    lat: 48.9022867,
    lng: 2.3067607,
    label: 'A',
    draggable: false
  }
]

let markersPromise = Promise.resolve(MARKERS);

@Injectable()
export class MarkerService {
  getMarkers(): Promise<Marker[]> {
    return markersPromise;
  }
  getMarker(id: number | string): Promise<Marker> {
    return markersPromise
      .then(markers => markers.find(marker => marker.id === +id));
  }
}
