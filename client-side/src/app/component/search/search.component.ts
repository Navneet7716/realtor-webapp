import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }
  location: any
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Geolocation permissions granted');
      console.log('Latitude:' + position.coords.latitude);
      console.log('Longitude:' + position.coords.longitude);
    });

  }

}
