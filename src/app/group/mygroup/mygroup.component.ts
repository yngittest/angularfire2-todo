import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

import { Group } from '../../model/group';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-mygroup',
  templateUrl: './mygroup.component.html',
  styleUrls: ['./mygroup.component.css']
})
export class MygroupComponent implements OnInit, OnDestroy {
  userId: string;
  userName: string;
  groups: Group[];
  private unsubscribe = new Subject<void>();

  constructor(
    private auth: AuthService,
    private db: FirebaseDbService,
    private group: GroupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.uid$
      .takeUntil(this.unsubscribe)
      .subscribe(uid => {
        this.userId = uid;
      });
    this.auth.name$
      .takeUntil(this.unsubscribe)
      .subscribe(name => {
        if(name) {
          this.userName = name;
          this.db.updateItem(`users/${this.userId}`, 'name', this.userName);
        }
      });
    this.group.groups$
      .takeUntil(this.unsubscribe)
      .subscribe(groups => {
        this.groups = groups;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addGroup(group: Group) {
    group['members'] = {[this.userId]: {name: this.userName}};
    const result = this.db.addItem('groups', null, group);
    this.db.addItem(`users/${this.userId}/groups`, result.key, true);
  }

  updateGroup(group: Group) {
    this.db.updateItem('groups', group.key, group.data);
  }

  deleteGroup(group: Group) {
    this.db.deleteItem('todos', group.key);
    this.db.deleteItem('groups', group.key);
    this.db.deleteItem(`users/${this.userId}/groups`, group.key);
    this.router.navigate(['/']);
  }

}
