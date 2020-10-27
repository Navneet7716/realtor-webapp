import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {

    this.service.getAllProperties().subscribe(el => {
      this.properties = el.data
      if (this.properties.length > 0) {
        this.showSpinner = false
      }
    })
  }

}
