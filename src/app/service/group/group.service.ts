import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

import { Group } from '../../model/group';
import { GroupList } from '../../model/group-list';

import { AuthService } from '../auth/auth.service';
import { FirebaseDbService } from '../firebase-db/firebase-db.service';

@Injectable()
export class GroupService {
  groups$: Observable<Group[]>;
  private unsubscribe = new Subject<void>();

  constructor(private auth: AuthService, private db: FirebaseDbService) {
    const groupList = new GroupList();
    this.groups$ = Observable.create(observer => {
      this.auth.uid$
        .takeUntil(this.unsubscribe)
        .subscribe(uid => {
          if(uid) {
            this.db.getItem(`/users/${uid}/groups`)
              .takeUntil(this.unsubscribe)
              .subscribe(groups => {
                if(groups) {
                  groupList.reset();
                  Object.keys(groups).forEach(groupKey => {
                    this.db.getItem(`/groups/${groupKey}`)
                      .takeUntil(this.unsubscribe)
                      .subscribe(group => {
                        const newGroup = new Group(group).setKey(group.$key);
                        groupList.add(newGroup);
                        observer.next(groupList.groups);
                      });
                  });
                }
              });
          } else {
            this.unsubscribe.next();
          }
        });
    });
  }

}
