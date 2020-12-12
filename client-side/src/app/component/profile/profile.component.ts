import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any

  imgurl: string = "../../../assets/images/users/"

  showSpinner: boolean = true
  constructor(private service: UserService, private router: Router) { }

  ownedProperties: any[] = []

  isOwner: boolean = false

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.service.getAUser().subscribe(el => {
      this.user = el.data; if (this.user != undefined || this.user != null) {
        this.showSpinner = false
        if (el.data.ownedProperties.length > 0)
          this.ownedProperties = el.data.ownedProperties;
      }

      if (el.data.role === "owner") {
        this.isOwner = true
      }
    }, err => {
      this.service.deleteToken()

      alert(err.error.message)
      this.router.navigateByUrl('/login')
    })


  }

}
