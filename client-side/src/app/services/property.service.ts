import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  url = ""


  getAllProperties(): Observable<any> {
    return this.http.get(this.url + '/api/v1/properties')
  }

  getOneProperty(slug: string): Observable<any> {
    return this.http.get(this.url + `/api/v1/properties/${slug}`)
  }

}
