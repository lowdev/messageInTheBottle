import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers }  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Marker } from './marker.model'

import 'rxjs/add/operator/toPromise';

declare var google: any;

@Injectable()
export class MarkerService {
  markerRequested: EventEmitter<any> = new EventEmitter();

  constructor (
    private http: Http) { }

  getMarkers(): Promise<any[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get("/markers", { headers })
                    .map(res => res.json())
                    .map(markers => this.toGoogleMarkers(markers))
                    .toPromise();
  }
  getMarker(id: number | string): Promise<any> {
    return this.getMarkers()
      .then(markers => this.toGoogleMarker(markers.find(marker => marker.id === +id)));
  }

  private toGoogleMarkers(markers: Marker[]): any[] {
    return markers.map(marker => this.toGoogleMarker(marker));
  }

  private toGoogleMarker(marker: Marker): any {
    let googleMarker = new google.maps.Marker({
      title: marker.label,
      position: { lat: marker.lat, lng: marker.lng }
    });

     /*var infowindow = new google.maps.InfoWindow({
       content: '<h4>' +  table.name + '</h4><p>' + table.address + '</p>'
     });

     marker.addListener('click', function() {
       infowindow.open(googleMap, marker);
     });*/

     return googleMarker;
   }
}
