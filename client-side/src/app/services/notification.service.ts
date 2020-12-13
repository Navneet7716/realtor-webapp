import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }


  url = ""

  getAllNotifications(): Observable<any> {
    return this.http.get(this.url + "/api/v1/notification/getNotification")
  }

  createNotification(id): Observable<any> {
    return this.http.post(this.url + "/api/v1/notification/", { id: id })
  }

  acceptNotification(id, email, name): Observable<any> {
    return this.http.post(this.url + "/api/v1/notification/accept", { id: id, email: email, name: name })
  }
  declineNotification(id, email, name): Observable<any> {
    return this.http.post(this.url + "/api/v1/notification/decline", { id: id, email: email, name: name })
  }
}
