import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { MarkerService }     from './marker.service';
import { BottleEventService }  from '../service/bottle-event.service';
import { BottlesEventService } from '../service/bottles-event.service';
import { Marker }               from './marker.model';
import { Bottle }               from '../bottle.model';
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
  witnessMarker: any;

  // google maps zoom level
  zoom: number = 15;

  // initial center position for the map
  lat: number = 48.8986394;
  lng: number = 2.3042683;

  constructor(
    private service: MarkerService,
    private bottleEventService: BottleEventService,
    private bottlesEventService: BottlesEventService,
    private router: Router
  ) {
    bottleEventService.loadedBottle.subscribe(
      item => {
        this.service.getMarker(item['id']).then(marker => {
          this.byebyeEditMode();
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

  mapLoaded(m) {
    console.log('map loaded!', m);
    this.map = m;
    this.markerClusterer =  new MarkerClusterer(m, [], MarkerClusterOptions.get());
    this.witnessMarker = this.service.createWitnessMarker(this.map.getCenter());

    this.service.getMarkers().then(markers => {
      markers.forEach(marker => {
        this.addMarker(marker);
      });
    });

    if (this.router.url.endsWith("add")) {
      this.activateSaveMode();
    }

    this.bottleEventService.bottleInEditMode.subscribe(
      item => {
        let id = item['id'];
        if (Bottle.NEW_ID == id) {
          this.activateSaveMode();
        } else {
          this.disableAllMarker();
          let marker = this.removeMarker(id);
          this.witnessMarker.setPosition(marker.getPosition());
          this.enableWitnessMarker();
        }
      }
    );

    this.bottleEventService.bottleChecked.subscribe(
      item => {
        this.bottleEventService.bottleMarkerIsSaved(this.witnessMarker);
      }
    );

    this.bottlesEventService.bottlesLoaded.subscribe(
      item => {
        this.resetMapPosition();
        this.byebyeEditMode();
      }
    );
  }

  private byebyeEditMode() {
    this.enableAllMarker();
    this.disableWitnessMarker();
  }

  private activateSaveMode() {
    this.disableAllMarker();
    this.enableWitnessMarker();
  }

  private enableWitnessMarker() {
    this.witnessMarker.setPosition(this.map.getCenter());
    this.witnessMarker.setMap(this.map);
  }

  private disableWitnessMarker() {
    this.witnessMarker.setMap(null);
  }

  private enableAllMarker() {
    this.markerClusterer.getMarkers().forEach(marker => {
      marker.setIcon('./asset/default-marker-icon.png');
    });
  }

  private disableAllMarker() {
    this.markerClusterer.getMarkers().forEach(marker => {
      marker.setIcon('./asset/disabled-marker-icon.png');
    });
  }

  private disableAllMarkerExclude(id: number) {
    this.markerClusterer.getMarkers().forEach(marker => {
      if (marker.id != id) {
        marker.setIcon('./asset/disabled-marker-icon.png');
      }
    });
  }

  private removeMarker(id: number) {
    let marker = this.findMarkerById(id);
    this.markerClusterer.removeMarker(marker);
    return marker;
  }

  private addMarker(marker:any) {
    marker.addListener('click', event => {
      this.center(event.latLng, 18);
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

  private findMarkerById(id: number) {
    return this.markerClusterer.getMarkers().find(marker =>
      marker.id == id);
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

  isExist(marker:any): boolean {
    return this.markerClusterer.getMarkers().find(markerFromCluster =>
      markerFromCluster.getPosition().lat() == marker.getPosition().lat()
      && markerFromCluster.getPosition().lng() == marker.getPosition().lng());
  }

  private center(latLng: any, zoom: Number) {
    this.map.panTo(latLng);
    this.map.setZoom(zoom);
  }

  private centerFromMarker(marker: any) {
    let position = marker.getPosition();
    let latlng = new google.maps.LatLng(position.lat(), position.lng());
    this.center(latlng, 18);
  }

  private resetMapPosition() {
    let latlng = new google.maps.LatLng(this.lat, this.lng);
    this.center(latlng, this.zoom);
  }
}
