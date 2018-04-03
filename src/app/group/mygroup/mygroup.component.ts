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
        .subscribe(user => {
          this.groups = [];
          if(user.groups) {
            const groupKeys = Object.keys(user.groups);
            groupKeys.forEach(groupKey => {
              this.db.getItem(`/groups/${groupKey}`).subscribe(group => {
                const newGroup = new Group(group.name, group.type, group.archived).setKey(group.$key);
                const index = this.groups.findIndex(({key}) => key === group.$key);
                if (index < 0) {
                  this.groups.push(newGroup);
                } else {
                  this.groups[index] = newGroup;
                }
              });
            });
          } else {
            this.addGroup(new Group('inbox', 0));
          }
          this.group.setGroups(this.groups);
        });
    });
  }

  addGroup(group: Group) {
    group['members'] = {[this.userId]: true};
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
