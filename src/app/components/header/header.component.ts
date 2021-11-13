import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Boolean = false;
  constructor(private authService: AuthService) {
    this.authService.LoggedIn.subscribe((data: Boolean) => {
      this.isAuthenticated = data;
    });
  }

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
  }
}
