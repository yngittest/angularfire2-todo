import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth/auth.service';
import { FirebaseMessagingService } from '../service/firebase-messaging/firebase-messaging.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  message;

  constructor(private auth: AuthService, private msg: FirebaseMessagingService) {
  }

  ngOnInit() {
    this.msg.getPermission();
    this.msg.receiveMessage();
    this.message = this.msg.currentMessage;
  }

  login() {
    this.auth.signIn();
  }

  logout() {
    this.auth.signOut();
  }
}
