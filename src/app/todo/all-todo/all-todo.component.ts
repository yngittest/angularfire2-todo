import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { Todo } from '../../model/todo';
import { TodoManageComponent } from '../todo-manage/todo-manage.component';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';

@Component({
  selector: 'app-all-todo',
  templateUrl: './all-todo.component.html',
  styleUrls: ['./all-todo.component.css']
})
export class AllTodoComponent extends TodoManageComponent implements OnInit {
  userId: string;
  groups: any[];

  @Input() name: string;
  @Input() done: boolean;

  constructor(
    router: Router,
    db: FirebaseDbService,
    private auth: AuthService
  ) {
    super(db, router);
  }

  ngOnInit() {
    this.auth.uid$.subscribe(uid => {
      this.userId = uid;
      this.db.getItem(`/users/${this.userId}`)
        .subscribe(user => {
          this.groups = [];
          if(user.groups) {
            const groupKeys = Object.keys(user.groups);
            groupKeys.forEach(groupKey => {
              const group = {key: groupKey, todos: []};
              const query = {query: {orderByChild: 'done', equalTo: this.done}};
              this.db.getItems(`/todos/${groupKey}`, query).subscribe((snapshots: any[]) => {
                group.todos = [];
                snapshots.forEach((snapshot: any) => {
                  group.todos.push(
                    new Todo(snapshot).setKey(snapshot.$key)
                  );
                });
                const index = this.groups.findIndex(({key}) => key === groupKey);
                if (index < 0) {
                  this.groups.push(group);
                } else {
                  this.groups[index] = group;
                }
              });
            });
          }
        });
    });
  }

}
