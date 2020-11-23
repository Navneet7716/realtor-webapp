import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  constructor() { }



  imgurl: string = "../../../../assets/images/property/"

  @Input() public parentData: any

  ngOnInit(): void {
  }

}
