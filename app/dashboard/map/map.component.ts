import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { MarkerService } from './marker.service';
import { Marker } from './marker.model';

@Component({
  moduleId: module.id,
  selector: 'map',
  providers: [ MarkerService ],
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // google maps zoom level
  zoom: number = 15;

  // initial center position for the map
  lat: number = 48.8986394;
  lng: number = 2.3042683;

  markers: Marker[];
  /*markers: Marker[] = [
	  {
		  lat: 48.9022867,
		  lng: 2.3067607,
		  label: 'A',
		  draggable: false
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: false
	  }
  ]*/

  constructor(
    private service: MarkerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getMarkers()
      .then(markers => {
        this.markers = markers;
    });
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
}
