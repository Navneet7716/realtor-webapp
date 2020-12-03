import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PropertyService } from "../../services/property.service"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: PropertyService) { }

  clicked: boolean = false

  showSpinner: boolean = true;

  properties: any = []
  propertiesnearby: any = []

  upcoming: any = []

  pagedList: any = []

  pagedListforupcoming: any = []

  length: number = 0;
  pageSize: number = 4;
  pageSizeOptions: number[] = [4, 8];

  lengthforUpcoming: number = 0;
  pageSizeforUpcoming: number = 4;
  pageSizeOptionsforUpcoming: number[] = [4, 8];

  lat;
  lng


  ngOnInit(): void {
    window.scrollTo(0, 0)

    navigator.geolocation.getCurrentPosition((position) => {

      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude

    })

    this.service.getAllProperties().subscribe(el => {
      this.properties = el.data.slice(0, 8)
      this.upcoming = el.data.slice(8, 13)
      this.pagedList = this.properties.slice(0, 4);
      this.pagedListforupcoming = this.upcoming.slice(0, 4)
      this.length = this.properties.length;
      this.lengthforUpcoming = this.upcoming.length;
      if (this.properties.length > 0) {
        this.showSpinner = false
      }
    })


  }

  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.pagedList = this.properties.slice(startIndex, endIndex);

  }
  OnPageChangeforUpcoming(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.lengthforUpcoming) {
      endIndex = this.lengthforUpcoming;
    }
    this.pagedListforupcoming = this.upcoming.slice(startIndex, endIndex)

  }

  callClick() {
    this.clicked = !this.clicked

    if (this.lat != undefined && this.lng != undefined) {
      this.service.getPropertiesWithin(this.lat, this.lng).subscribe(el => {
        this.propertiesnearby = el.data.data
      })
    }

  }



}
