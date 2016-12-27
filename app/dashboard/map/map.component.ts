import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.css']

})
export class MapComponent {
  // google maps zoom level
  zoom: number = 15;

  // initial center position for the map
  lat: number = 48.8986394;
  lng: number = 2.3042683;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    /*this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });*/
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
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
  ]
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
