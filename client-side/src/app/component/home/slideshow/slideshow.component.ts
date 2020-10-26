import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  constructor() { }

  images: string[] = ['../../../../assets/images/carosel-1.jpg', '../../../../assets/images/carosel-2.jpg', '../../../../assets/images/carosel-3.jpg']

  ngOnInit(): void {
  }

}
