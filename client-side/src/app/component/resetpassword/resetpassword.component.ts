import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service"
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  errorMsg;
  user: any = {
    password: '',
    passwordConfirm: ''
  }
  constructor(private router: Router, public service: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  FormSubmit(e) {
    e.preventDefault();

    this.service.resetPassword(this.user, this.route.snapshot.params.token).subscribe(el => {
      if (el['status'] == 'success') {
        this.service.setToken(el['token']);
        alert("Password reset Successfull !!!")
        this.router.navigateByUrl('/profile')
      }
    }, err => {
      alert(err.error.message + ", please try again later 🤖")

    })

  }

}
