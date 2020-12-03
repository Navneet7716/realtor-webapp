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

  showSpinner: boolean = true;

  properties: any = []

  pagedList: any = []

  length: number = 0;
  pageSize: number = 6;
  pageSizeOptions: number[] = [6, 12];

  ngOnInit(): void {
    window.scrollTo(0, 0)

    this.service.getAllProperties().subscribe(el => {
      this.properties = el.data
      this.pagedList = this.properties.slice(0, 6);
      this.length = this.properties.length;
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


}
