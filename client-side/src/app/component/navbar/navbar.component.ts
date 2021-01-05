import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"
import { NotificationService } from '../../services/notification.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public service: UserService, private nservice: NotificationService) { }
  oLength: number = 0

  ngOnInit(): void {

    let log = this.service.isLoggedin()
    if (log) {

      this.nservice.getAllNotifications().subscribe(el => {


        if (el.data.length > 0)
          this.oLength = el.data.length;

      })
    }
  }

  Logout() {
    this.service.deleteToken();
    this.service.logout().subscribe(el => {
      if (el.message === "Logged Out") {
        alert("Logged out!")
      }
    })
  }

}
