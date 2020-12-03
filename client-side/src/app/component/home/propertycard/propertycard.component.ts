import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-propertycard',
  templateUrl: './propertycard.component.html',
  styleUrls: ['./propertycard.component.css']
})
export class PropertycardComponent implements OnInit {

  @Input() public parentData

  @Output() public childevent = new EventEmitter();

  imgurl: string = "../../../../assets/images/property/"

  constructor() { }

  ngOnInit(): void {
  }



}
