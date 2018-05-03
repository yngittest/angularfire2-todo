import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  authenticated$: Observable<boolean>;
  uid$: Observable<string>;
  name$: Observable<string>;

  constructor(public afAuth: AngularFireAuth) {
    this.authenticated$ = afAuth.authState.map(user => !!user);
    this.uid$ = afAuth.authState.map(user => {
      if(user) {
        return user.uid;
      }
    });
    this.name$ = afAuth.authState.map(user => {
      if(user) {
        return user.displayName;
      }
    });
  }

  signIn() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
