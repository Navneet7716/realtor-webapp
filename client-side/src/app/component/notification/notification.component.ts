import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  showSpin: boolean = true

  spin: boolean
  dspin: boolean

  constructor(private service: NotificationService, private snackBar: MatSnackBar) { }
  allNotification: any[] = [];

  reqestedby: any

  ngOnInit(): void {
    this.service.getAllNotifications().subscribe(el => {
      this.allNotification = el.data;
      this.showSpin = false
      // console.log(el)
    })
  }
  acceptNoti(id, email, name) {
    this.spin = true
    setTimeout(() => {
      this.allNotification = this.allNotification.filter(el => el._id != id)
    }, 2000)

    this.service.acceptNotification(id, email, name).subscribe(el => {
      if (el.status === "Success") {
        this.spin = false
        this.snackBar.open(`${el.message}`, 'OK', {
          duration: 6000,
        });

      }
    })

  }
  declineNoti(id, email, name) {
    this.dspin = true
    this.allNotification = this.allNotification.filter(el => el._id != id)
    this.service.declineNotification(id, email, name).subscribe(el => {
      if (el.status === "Success") {
        this.dspin = false
        this.snackBar.open(`${el.message}`, 'OK', {
          duration: 6000,
        });

      }
    })

  }



}
