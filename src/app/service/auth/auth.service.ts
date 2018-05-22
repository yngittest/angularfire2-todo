import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators/map";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  authenticated$: Observable<boolean>;
  uid$: Observable<string>;
  name$: Observable<string>;

  constructor(public afAuth: AngularFireAuth) {
    this.authenticated$ = afAuth.authState.pipe(map(user => !!user));
    this.uid$ = afAuth.authState.pipe(map(user => {
      if(user) {
        return user.uid;
      }
    }));
    this.name$ = afAuth.authState.pipe(map(user => {
      if(user) {
        return user.displayName;
      }
    }));
  }

  signIn() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
