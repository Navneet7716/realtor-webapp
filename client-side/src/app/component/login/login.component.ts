import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner

  user = {
    email: '',
    password: '',
  };
  errorMsg: string;
  constructor(public service: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.service.isLoggedin()) this.router.navigateByUrl('/profile');
  }

  FormSubmit(e) {
    e.preventDefault();
    this.showSpinner = true
    this.service.login(this.user.email, this.user.password).subscribe(
      (el) => {
        this.service.setToken(el['token']);
        if (el['status'] === 200 || el['status'] === 'success') {
          this.snackBar.open('Login SuccessFull !!', 'OK', {
            duration: 3000,
          });
          this.showSpinner = false
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 1000)
        }
      },
      (err) => {
        this.errorMsg = err.error.message;
      }
    );
  }

}
