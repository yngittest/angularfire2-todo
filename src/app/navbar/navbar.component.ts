import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) {
  }

  ngOnInit() { }

  login() {
    this.auth.signIn();
  }

  logout() {
    this.auth.signOut();
  }
}
