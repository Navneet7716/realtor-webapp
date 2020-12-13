import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-property-register',
  templateUrl: './property-register.component.html',
  styleUrls: ['./property-register.component.css'],
})
export class PropertyRegisterComponent implements OnInit {
  firstFormGroup: FormGroup;

  errormessage: string = "";
  constructor(private _formBuilder: FormBuilder, private cd: ChangeDetectorRef, private service: PropertyService, private userservice: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ownedProperties: [string];

  isEnabled: boolean = true;

  userId: string = ""
  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      price: [new Number(), Validators.required],
      longitude: [NumberValueAccessor, Validators.required],
      latitude: [NumberValueAccessor, Validators.required],
      type: ['', Validators.required],
      unit: ['', Validators.required],
      area: ['', Validators.required],
    });

    this.userservice.getAUser().subscribe(el => {
      this.userId = el.data.id;
      this.ownedProperties = el.data.ownedProperties
    })
  }


  onSubmit() {
    this.isEnabled = false
    let property = {
      location: { coordinates: [this.firstFormGroup.value.longitude, this.firstFormGroup.value.latitude] },
      address: this.firstFormGroup.value.address,
      images: [],
      coverImage: "",
      dealers: ["5c8a1f292f8fb814b56fa184", "5c8a1f4e2f8fb814b56fa185", "5c8a201e2f8fb814b56fa186"],
      description: this.firstFormGroup.value.description,
      price: this.firstFormGroup.value.price,
      slug: "",
      name: this.firstFormGroup.value.name,
      specifications: {
        Propertytype: this.firstFormGroup.value.type,
        unit: this.firstFormGroup.value.unit,
        area: this.firstFormGroup.value.area
      },
      owner: this.userId

    }


    this.service.insertProperty(property).subscribe(el => {
      if (el['status'] === 200 || el['status'] === 'Success') {

        // console.log(el)
        this.snackBar.open('Property is Successfully Submitted !! But Please Upload the Images also', 'OK', {
          duration: 4000,
        });
        this.router.navigate([`/uploadImage/${el.data._id}`]);
      }
    }, (err) => {
      if (err) this.errormessage = "There was Some Error Please try adding real values or try again later !!"
    })

  }
}
