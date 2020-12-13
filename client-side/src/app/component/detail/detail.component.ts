import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  slug: string
  ownerId: string
  propertyData: any
  userId: string

  isEnabled: boolean = true;

  constructor(
    public service: PropertyService,
    private location: Location,
    private route: ActivatedRoute,
    private nt: NotificationService,
    public us: UserService,
    private mt: MatSnackBar) { }
  showSpinner: boolean = true;
  ngOnInit(): void {
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });
    this.userId = this.us.getUserId()
    window.scrollTo(0, 0)
    this.slug = this.route.snapshot.params['slug'];
    this.service.getOneProperty(this.slug).subscribe(el => {
      // console.log(el.data)
      this.propertyData = el.data[0]
      this.ownerId = el.data[0].owner.id
      // console.log(this.ownerId)
      if (this.propertyData != undefined || this.propertyData != null) {
        this.showSpinner = false
      }
    })


  }

  requestContact() {
    this.isEnabled = false
    this.nt.createNotification(this.ownerId).subscribe(el => {
      // console.log(el)
      this.mt.open(`Requested Successfull! ${el.message}`, 'OK', {
        duration: 6000,
      });
    }, err => {
      this.mt.open(`Request Unsuccessfull! ${err.message}`, 'OK', {
        duration: 6000,
      });
    })
  }

}
