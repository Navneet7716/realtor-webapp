import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  public user: any
  public updateUser: any;

  public errorMsg
  showSpinner = true
  constructor(public service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.service.getAUser().subscribe(el => {
      this.user = el.data;
      this.showSpinner = false
    })
  }


  FormSubmit(e) {
    e.preventDefault();

    this.updateUser = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
    }
    this.service.updateUser(this.updateUser).subscribe(el => {
      if (el['status'] === 200 || el['status'] === 'success') {
        this.router.navigate(['/profile']);
      }
      else {
        this.errorMsg = el['message'];
      }
    });

  }

}
