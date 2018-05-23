import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators/takeUntil";

import { TodoManageComponent } from '../todo-manage/todo-manage.component';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-all',
  templateUrl: './todo-all.component.html',
  styleUrls: ['./todo-all.component.css']
})
export class TodoAllComponent extends TodoManageComponent implements OnInit, OnDestroy {
  userId: string;
  groups: Group[];
  groupSets: any[];
  todos: Todo[];
  sort = {key: 'due', desc: false};
  private unsubscribe = new Subject<void>();

  constructor(
    router: Router,
    db: FirebaseDbService,
    private auth: AuthService,
    private group: GroupService
  ) {
    super(db, router);
  }

  ngOnInit() {
    this.auth.uid$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(uid => {
        this.userId = uid;
      });

    this.group.groups$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(groups => {
        this.groups = groups;
        this.groupSets = [];
        groups.forEach(group => {
          const groupSet = {key: group.key, todos: []};
          const query = {query: {orderByChild: 'done', equalTo: false}};
          this.db.getItems(`/todos/${group.key}`, query)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((snapshots) => {
              groupSet.todos = [];
              snapshots.forEach((snapshot: any) => {
                groupSet.todos.push(
                  new Todo(snapshot.payload.val()).setKey(snapshot.key)
                );
              });
              const index = this.groupSets.findIndex(({key}) => key === group.key);
              if (index < 0) {
                this.groupSets.push(groupSet);
              } else {
                this.groupSets[index] = groupSet;
              }
              this.todos = this.flattenTodos(this.groupSets);
            });
        });
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
