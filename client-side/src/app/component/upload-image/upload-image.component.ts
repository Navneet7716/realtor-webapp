import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  id: string;

  isEnabled: boolean = true;

  selectedFile: File
  selectedFile1: File
  selectedFile2: File
  selectedFile3: File

  constructor(private http: HttpClient, private route: ActivatedRoute, private mt: MatSnackBar, private router: Router) { }

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

  progress: number = 0;

  onUpload() {
    this.isEnabled = false
    const uploadData = new FormData();
    uploadData.append('coverImage', this.selectedFile, this.selectedFile.name);
    uploadData.append('images', this.selectedFile1, this.selectedFile1.name);
    uploadData.append('images', this.selectedFile2, this.selectedFile2.name);
    uploadData.append('images', this.selectedFile3, this.selectedFile3.name);

    this.http.post(`/api/v1/properties/uploadImage/${this.id}`, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            // console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            // console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            // console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            // console.log('Image successfully uploaded!', event.body);
            setTimeout(() => {
              this.progress = 0;
            }, 2500);
            break;

        }
        this.mt.open('Uploaded Images SuccessFull !!', 'OK', {
          duration: 3000,
        });

        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 3000)

      });
  }

}
