import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-owned-properties',
  templateUrl: './owned-properties.component.html',
  styleUrls: ['./owned-properties.component.css']
})
export class OwnedPropertiesComponent implements OnInit {

  constructor() { }
  imgurl: string = "../../../assets/images/property/"

  @Input() public parentData

  ngOnInit(): void {
  }

}
