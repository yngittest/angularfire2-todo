import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { take } from "rxjs/operators/take";

import { MatSnackBar } from '@angular/material';

@Injectable()
export class FirebaseMessagingService {

  messaging = firebase.messaging();

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) { }

  updateToken(token) {
    this.afAuth.authState.pipe(take(1)).subscribe(user => {
      if (!user) return;
      const data = { fcmToken: token }
      this.db.object(`/users/${user.uid}`).update(data);
    })
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.openSnackBar(payload.notification.title);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'dismiss', {
      duration: 2000,
    });
  }

}
