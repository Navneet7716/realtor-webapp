import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private service: NotificationService, private snackBar: MatSnackBar) { }
  allNotification: any[] = [];

  reqestedby: any

  ngOnInit(): void {
    this.service.getAllNotifications().subscribe(el => {
      this.allNotification = el.data;
      // console.log(el)
    })
  }
  acceptNoti(id, email, name) {

    this.allNotification = this.allNotification.filter(el => el._id != id)
    this.service.acceptNotification(id, email, name).subscribe(el => {
      if (el.status === "Success") {
        this.snackBar.open(`${el.message}`, 'OK', {
          duration: 6000,
        });

      }
    })

  }
  declineNoti(id, email, name) {

    this.allNotification = this.allNotification.filter(el => el._id != id)
    this.service.declineNotification(id, email, name).subscribe(el => {
      if (el.status === "Success") {
        this.snackBar.open(`${el.message}`, 'OK', {
          duration: 6000,
        });

      }
    })

  }



}
