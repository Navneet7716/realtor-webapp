import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-propertycard',
  templateUrl: './propertycard.component.html',
  styleUrls: ['./propertycard.component.css']
})
export class PropertycardComponent implements OnInit {

  @Input() public parentData

  imgurl: string = "../../../../assets/images/property/"

  constructor() { }

  ngOnInit(): void {
  }

}
