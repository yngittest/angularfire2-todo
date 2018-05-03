import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

import { TodoManageComponent } from '../todo-manage/todo-manage.component';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-all-todo',
  templateUrl: './all-todo.component.html',
  styleUrls: ['./all-todo.component.css']
})
export class AllTodoComponent extends TodoManageComponent implements OnInit, OnDestroy {
  userId: string;
  groups: Group[];
  groupSets: any[];
  private unsubscribe = new Subject<void>();

  @Input() name: string;
  @Input() done: boolean;

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
      .takeUntil(this.unsubscribe)
      .subscribe(uid => {
        this.userId = uid;
      });

    this.group.groups$
      .takeUntil(this.unsubscribe)
      .subscribe(groups => {
        this.groups = groups;
        this.groupSets = [];
        groups.forEach(group => {
          const groupSet = {key: group.key, todos: []};
          const query = {query: {orderByChild: 'done', equalTo: this.done}};
          this.db.getItems(`/todos/${group.key}`, query)
            .takeUntil(this.unsubscribe)
            .subscribe((snapshots: any[]) => {
              groupSet.todos = [];
              snapshots.forEach((snapshot: any) => {
                groupSet.todos.push(
                  new Todo(snapshot).setKey(snapshot.$key)
                );
              });
              const index = this.groupSets.findIndex(({key}) => key === group.key);
              if (index < 0) {
                this.groupSets.push(groupSet);
              } else {
                this.groupSets[index] = groupSet;
              }
            });
        });
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
