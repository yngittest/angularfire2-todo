import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../../model/group';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-mygroup',
  templateUrl: './mygroup.component.html',
  styleUrls: ['./mygroup.component.css']
})
export class MygroupComponent implements OnInit {
  userId: string;
  groups: Group[];

  constructor(private auth: AuthService, private db: FirebaseDbService, private group: GroupService, private router: Router) { }

  ngOnInit() {
    this.auth.uid$.subscribe(uid => {
      this.userId = uid;
      this.db.getItem(`/users/${this.userId}`)
        .map(user => {
          let groupFBObjList = [];
          let keys = Object.keys(user.groups);
          keys.forEach(key => {
            groupFBObjList.push(this.db.getItem(`/groups/${key}`));
          });
          return groupFBObjList;
        })
        .subscribe(groupFBObjList => {
          this.groups = [];
          groupFBObjList.forEach(groupFBObj => {
            groupFBObj.subscribe(group => {
              const newGroup = new Group(group.name, group.archived, group.type).setKey(group.$key);
              const index = this.groups.findIndex(({key}) => key === group.$key);
              if(index < 0) {
                this.groups.push(newGroup);
              } else {
                this.groups[index] = newGroup;
              }
            });
          });
          this.group.setGroups(this.groups);
        });
    });
  }

  addGroup(group: Group) {
    group['members'] = {[this.userId]: true};
    let result = this.db.addItem('groups', null, group);
    let groupKey = result.key;
    this.db.addItem(`users/${this.userId}/groups`, groupKey, true);
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
