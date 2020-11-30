import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: string

  finalList: any[]


  DataSet: any[]

  constructor(private service: PropertyService) { }

  // location: any


  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.service.getAllProperties().subscribe(el => {
      this.DataSet = el.data
    })



  }

  onSubmit() {

    if (!this.search || this.search === "") {
      this.finalList = this.DataSet;
    } else {
      this.finalList = this.DataSet.filter((property) => property.address.toLowerCase()
        .indexOf(this.search.toLowerCase()) !== -1);
    }
  }




}

// navigator.geolocation.getCurrentPosition(function (position) {
//   console.log('Geolocation permissions granted');
//   console.log('Latitude:' + position.coords.latitude);
//   console.log('Longitude:' + position.coords.longitude);
// });