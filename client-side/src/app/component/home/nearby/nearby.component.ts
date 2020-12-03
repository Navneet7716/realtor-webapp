import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {

  constructor() { }
  @Input() public parentData

  imgurl: string = "../../../../assets/images/property/"
  ngOnInit(): void {
  }

}
