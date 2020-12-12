import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-owner-register',
  templateUrl: './owner-register.component.html',
  styleUrls: ['./owner-register.component.css']
})
export class OwnerRegisterComponent implements OnInit {
  user = {
    email: '',
    password: '',
    passwordConfirm: '',
    phone: 91,
    name: '',
    role: 'owner'
  };
  showSpinner

  errorMsg: string
  message: string
  loggedIn: boolean = false

  constructor(public service: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.service.isLoggedin()) {
      this.loggedIn = true
      this.message = "Already Logged in As a User!!"
    }
  }
  FormSubmit(e) {
    e.preventDefault();
    this.showSpinner = true
    this.service.registerOwner(this.user).subscribe(
      (el) => {
        this.service.setToken(el['token']);
        this.showSpinner = false
        if (el['status'] === 200 || el['status'] === 'success') {
          this.router.navigate(['/profile']);
        }
      },
      (err) => {
        this.errorMsg = err.error.message;
      }
    );
  }

}
