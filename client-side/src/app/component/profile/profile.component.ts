import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any

  imgurl: string = "../../../assets/images/users/"

  showSpinner: boolean = true
  constructor(private service: UserService) { }

  ngOnInit(): void {

    this.service.getAUser().subscribe(el => {
      this.user = el.data; if (this.user != undefined || this.user != null) {
        this.showSpinner = false
      }
    })


  }

}
