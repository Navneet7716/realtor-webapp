import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  myForm: FormGroup

  search: string

  finalList: any[]


  DataSet: any[]

  constructor(private service: PropertyService, private fb: FormBuilder) { }

  // location: any


  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.myForm = this.fb.group({
      search: ''
    })
    this.service.getAllProperties().subscribe(el => {
      this.DataSet = el.data
    })
  }


  onSubmit() {

    if (!this.myForm.value.search || this.myForm.value.search === "") {
      this.finalList = this.DataSet;
    } else {
      this.finalList = this.DataSet.filter((property) => property.address.toLowerCase()
        .indexOf(this.myForm.value.search.toLowerCase()) !== -1);
    }
  }




}

// navigator.geolocation.getCurrentPosition(function (position) {
//   console.log('Geolocation permissions granted');
//   console.log('Latitude:' + position.coords.latitude);
//   console.log('Longitude:' + position.coords.longitude);
// });