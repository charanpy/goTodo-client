import { User } from './../../model/User.model';
import { Response } from './../../model/Response.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin: Boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  setLogin() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      return alert('Please fill all field');
    }

    const { name, email, password } = f.value;

    const data = {
      ...(name && { name }),
      email,
      password,
    };
    this.authService.auth(data, this.isLogin).subscribe(
      (data) => {
        if (this.isLogin) {
          const res = { ...data } as Response;
          localStorage.setItem('gotodo', res?.token ? res.token : '');
          this.authService.User.next(res.user);
          this.authService.LoggedIn = true;
          return this.router.navigate(['']);
        }
        f.reset();
        this.isLogin = !this.isLogin;
        return;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
