import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  constructor() { }

  @Input() public parentData

  imgurl: string = "../../../../assets/images/property/"

  ngOnInit(): void {
  }

}
