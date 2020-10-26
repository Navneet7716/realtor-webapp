import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() public parentData

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  constructor() { }

  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 15,
      center: [this.parentData[1], this.parentData[0]],
      scrollZoom: false,
    });
    // Add map controls
    new mapboxgl.Marker()
      .setLngLat([this.parentData[1], this.parentData[0]])
      .addTo(this.map);
    this.map.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true
    }));
  }
}
