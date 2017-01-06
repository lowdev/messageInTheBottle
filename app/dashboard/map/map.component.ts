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
        this.service.getMarker(item['id'], this.map).then(marker => {
          this.markerClusterer.addMarker(marker, true);
          this.markerClusterer.setIgnoreHidden(true);
          this.markerClusterer.repaint();
        });
      }
    );
  }

  clickedMarker(id: string, index: number) {
    console.log(`clicked the marker: ${id || index}`);
    this.displayDetail(id);
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

    this.service.getMarkers(m).then(markers => {
      this.markerClusterer =  new MarkerClusterer(m, markers, MarkerClusterOptions.get());
    });
  }
}
