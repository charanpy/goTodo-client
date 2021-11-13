import { Router } from '@angular/router';
import { Response } from './../model/Response.model';
import { User } from './../model/User.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private isLoggedIn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(
    false
  );

  get User() {
    return this.user;
  }

  get LoggedIn() {
    return this.isLoggedIn;
  }

  set LoggedIn(value: any) {
    this.isLoggedIn.next(value);
  }
  set User(user) {
    this.user.next(user);
  }

  constructor(private http: HttpClient, private router: Router) {
    this.getUser()?.subscribe(
      (data) => {
        const user = ({ ...data } as Response).user;
        if (!user) return;
        this.user.next(user);
        this.isLoggedIn.next(true);
        this.router.navigate(['']);
      },
      () => {
        localStorage.removeItem('gotodoToken');

        this.user.next(null);
        this.LoggedIn.next(false);
      }
    );
  }

  getToken() {
    return localStorage.getItem('gotodo');
  }

  getUser() {
    const token = this.getToken();
    if (!token) return;
    return this.http.get(`${environment.API}/api/v1/me`, {
      headers: {
        Authorization: token,
      },
    });
  }

  auth(user: User, isLogin: Boolean) {
    return this.http.post(
      `${environment.API}/api/v1/${isLogin ? 'login' : 'register'}`,
      user
    );
  }

  logout() {
    localStorage.removeItem('gotodo');
    this.user.next(null);
    this.isLoggedIn.next(false);
    return this.router.navigate(['auth']);
  }
}
