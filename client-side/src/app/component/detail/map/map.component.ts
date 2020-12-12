import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import ZoomControl from 'mapbox-gl-controls/lib/zoom';
import CompassControl from 'mapbox-gl-controls/lib/compass';

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
      center: [this.parentData[0], this.parentData[1]],
      scrollZoom: false,
    });
    // Add map controls
    new mapboxgl.Marker()
      .setLngLat([this.parentData[0], this.parentData[1]])
      .addTo(this.map);
    this.map.addControl(new ZoomControl());
    this.map.addControl(new CompassControl(), 'top-right');
  }
}
