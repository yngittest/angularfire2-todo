import { Injectable } from '@angular/core';

import { Observable ,  Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators/takeUntil";
import { map } from "rxjs/operators/map";

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
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(uid => {
          if(uid) {
            this.db.getItem(`/users/${uid}/groups`)
              .pipe(takeUntil(this.unsubscribe))
              .subscribe(snapshots => {
                const groups = snapshots.payload.val();
                if(groups) {
                  groupList.reset();
                  Object.keys(groups).forEach(groupKey => {
                    this.db.getItem(`/groups/${groupKey}`)
                      .pipe(takeUntil(this.unsubscribe))
                      .subscribe(snapshot => {
                        const key = snapshot.key;
                        const group = snapshot.payload.val();
                        if(key && group) {
                          const newGroup = new Group(group).setKey(key);
                          groupList.add(newGroup);
                          observer.next(groupList.groups);
                        }
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
