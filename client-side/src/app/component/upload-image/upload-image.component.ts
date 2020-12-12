import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  id: string;

  selectedFile: File
  selectedFile1: File
  selectedFile2: File
  selectedFile3: File

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]

  }
  onFileChanged1(event) {
    this.selectedFile1 = event.target.files[0]

  }
  onFileChanged2(event) {
    this.selectedFile2 = event.target.files[0]

  }
  onFileChanged3(event) {
    this.selectedFile3 = event.target.files[0]

  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('coverImage', this.selectedFile, this.selectedFile.name);
    uploadData.append('images', this.selectedFile1, this.selectedFile1.name);
    uploadData.append('images', this.selectedFile2, this.selectedFile2.name);
    uploadData.append('images', this.selectedFile3, this.selectedFile3.name);

    this.http.post(`http://localhost:4000/api/v1/properties/uploadImage/${this.id}`, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(el => {
        console.log(el)
      });
  }

}
