import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  user = {
    email: ''
  }
  errorMsg

  showSpinner;

  btndisable = false

  constructor(public service: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  FormSubmit(e) {
    e.preventDefault();
    this.showSpinner = true;
    this.btndisable = true;

    this.service.forgotPassword(this.user.email).subscribe(el => {
      console.log(el)

      if (el['status'] == 'success' || el['status'] == 200) {
        this.showSpinner = false
        alert(el['message'] + " Check your email for the reset link! ")
      }
    })


  }
}
