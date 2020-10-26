import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post('/api/v1/users/login', { email, password }, this.noAuthHeader);
  }


  register(user: any) {
    return this.http.post('/api/v1/users/signup', user, this.noAuthHeader)
  }

  getAUser() {
    return this.http.get<any>('/api/v1/users/getMe');

  }
  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  getToken(): string {
    return localStorage.getItem('token')
  }

  deleteToken() {
    localStorage.removeItem('token')
  }

  getUserPayload() {
    let token = this.getToken()
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else {
      return null;
    }
  }

  isLoggedin(): boolean {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000
    }
    else {
      return false;
    }
  }





}
