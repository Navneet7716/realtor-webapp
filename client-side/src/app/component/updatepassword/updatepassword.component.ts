import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {

  showSpinner: boolean

  public user = {
    passwordCurrent: '',
    password: '',
    passwordConfirm: ''

  }
  public updateUser: any;

  public errorMsg

  constructor(public service: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  FormSubmit(e) {
    e.preventDefault();
    this.showSpinner = true

    this.service.updatePassword(this.user).subscribe(el => {
      if (el['status'] === 200 || el['status'] === 'success') {
        this.service.setToken(el['token']);
        alert('Password Updated!!');
        this.showSpinner = false;
        this.router.navigate(['/profile']);
      }

    },
      err => {
        if (err) {

          // console.log(err)
          this.errorMsg = err.error.message;

        }
      });
  }

}
