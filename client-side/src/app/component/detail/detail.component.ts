import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  slug: string
  ownerId: string
  propertyData: any
  constructor(
    public service: PropertyService,
    private location: Location,
    private route: ActivatedRoute,
    private nt: NotificationService) { }
  showSpinner: boolean = true;
  ngOnInit(): void {
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });
    window.scrollTo(0, 0)
    this.slug = this.route.snapshot.params['slug'];
    this.service.getOneProperty(this.slug).subscribe(el => {
      console.log(el.data)
      this.propertyData = el.data[0]
      this.ownerId = el.data[0].owner.id
      console.log(this.ownerId)
      if (this.propertyData != undefined || this.propertyData != null) {
        this.showSpinner = false
      }
    })


  }

  requestContact() {
    this.nt.createNotification(this.ownerId).subscribe(el => {
      console.log(el)
    })
  }

}
