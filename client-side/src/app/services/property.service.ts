import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) }

  constructor(private http: HttpClient) { }

  url = ""


  getAllProperties(): Observable<any> {
    return this.http.get(this.url + '/api/v1/properties')
  }

  getOneProperty(slug: string): Observable<any> {
    return this.http.get(this.url + `/api/v1/properties/${slug}`)
  }

  getPropertiesWithin(lat, lng): Observable<any> {
    return this.http.get(this.url + `/api/v1/properties/properties-within/200/center/${lat},${lng}/unit/km`, this.noAuthHeader)
  }

  insertProperty(file): Observable<any> {
    return this.http.post(this.url + `/api/v1/properties`, file)
  }

}
