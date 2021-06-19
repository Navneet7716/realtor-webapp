import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post('http://localhost:4000/api/v1/users/login', { email, password }, this.noAuthHeader);
  }


  register(user: any) {
    return this.http.post('http://localhost:4000/api/v1/users/signup', user, this.noAuthHeader)
  }
  registerOwner(user: any) {
    return this.http.post('http://localhost:4000/api/v1/users/signupowner', user, this.noAuthHeader)
  }

  getAUser() {
    return this.http.get<any>('http://localhost:4000/api/v1/users/getMe');

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
      try {
        const userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      } catch (error) {
        return null;
      }


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

  isOwner(): boolean {
    if (this.isLoggedin()) {
      const userPayload = this.getUserPayload();
      if (userPayload) {
        return userPayload.role === "owner"
      }
      else {
        return false;
      }
    }
    return false

  }

  getUserId() {
    if (this.isLoggedin()) {
      const userPayload = this.getUserPayload();
      if (userPayload) {
        return userPayload.id
      }
    }
  }

  updateUser(user): any {
    return this.http.post('http://localhost:4000/api/v1/users/updateMe', user);
  }

  updatePassword(user): any {
    return this.http.patch('http://localhost:4000/api/v1/users/updateMyPassword', user)
  }

  forgotPassword(email): any {
    return this.http.post("http://localhost:4000/api/v1/users/forgotPassword", { email: email }, this.noAuthHeader)
  }

  resetPassword(user, token): any {
    return this.http.patch(`http://localhost:4000/api/v1/users/resetPassword/${token}`, { password: user.password, passwordConfirm: user.passwordConfirm }, this.noAuthHeader)
  }

  logout(): Observable<any> {
    return this.http.get<any>(`/api/v1/users/logout`);
  }


}
