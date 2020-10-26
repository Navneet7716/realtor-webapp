import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    email: '',
    password: '',
    passwordConfirm: '',
    phone: 91,
    name: ''
  };

  errorMsg: string
  constructor(public service: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.service.isLoggedin()) this.router.navigateByUrl('/profile');
  }

  FormSubmit(e) {
    e.preventDefault();
    this.service.register(this.user).subscribe(
      (el) => {
        this.service.setToken(el['token']);
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
