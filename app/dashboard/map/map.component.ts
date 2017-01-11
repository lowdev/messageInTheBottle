import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { MarkerService } from './marker.service';
import { MapService }    from './map.service';
import { Marker }               from './marker.model';
import { MarkerClusterOptions } from './markerClusterOptions';

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  moduleId: module.id,
  selector: 'map',
  providers: [ MarkerService ],
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  map: any;
  markerClusterer: any;

  // google maps zoom level
  zoom: number = 15;

  // initial center position for the map
  lat: number = 48.8986394;
  lng: number = 2.3042683;

  constructor(
    private service: MarkerService,
    private mapService: MapService,
    private router: Router
  ) {
    mapService.markerRequested.subscribe(
      item => {
        this.service.getMarker(item['id']).then(marker => {
          if (this.isExist(marker)) {
            this.centerFromMarker(marker);
            return;
          }

          this.addMarker(marker);
          this.centerFromMarker(marker);
        });
      }
    );
  }

  private addMarker(marker:any) {
    marker.addListener('click', event => {
      this.center(event.latLng);
      let marker = this.findMarkerByLatLng(event.latLng);
      this.displayDetail(marker.id);
    });

    this.markerClusterer.addMarker(marker, true);
    this.markerClusterer.setIgnoreHidden(true);
    this.markerClusterer.repaint();
  }

  private findMarkerByLatLng(latLng:any) {
    return this.markerClusterer.getMarkers().find(marker =>
      marker.getPosition().lat() == latLng.lat()
      && marker.getPosition().lng() == latLng.lng());
  }

  private displayDetail(id: string) {
    this.router.navigate(['/dashboard/message/' + id]);
  }

  mapClicked($event: MouseEvent) {
    /*this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });*/
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  mapLoaded(m) {
    console.log('map loaded!', m);
    this.map = m;
    this.markerClusterer =  new MarkerClusterer(m, [], MarkerClusterOptions.get());

    this.service.getMarkers().then(markers => {
      markers.forEach(marker => {
        this.addMarker(marker);
      });
    });
  }

  isExist(marker:any): boolean {
    return this.markerClusterer.getMarkers().find(markerFromCluster =>
      markerFromCluster.getPosition().lat() == marker.getPosition().lat()
      && markerFromCluster.getPosition().lng() == marker.getPosition().lng());
  }

  private center(latLng: any) {
    this.map.panTo(latLng);
    this.map.setZoom(18);
  }

  private centerFromMarker(marker: any) {
    let position = marker.getPosition();
    let latlng = new google.maps.LatLng(position.lat(), position.lng());
    this.center(latlng);
  }
}
