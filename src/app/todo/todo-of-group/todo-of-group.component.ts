import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators/takeUntil";

import { TodoManageComponent } from '../todo-manage/todo-manage.component';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';
import { GroupList } from '../../model/group-list';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-of-group',
  templateUrl: './todo-of-group.component.html',
  styleUrls: ['./todo-of-group.component.css'],
})
export class TodoOfGroupComponent extends TodoManageComponent implements OnInit, OnDestroy {
  userId: string;
  groups: Group[];
  groupKey: string;
  groupName: string;
  todos: Todo[];
  private unsubscribe = new Subject<void>();

  constructor(
    router: Router,
    db: FirebaseDbService,
    private route: ActivatedRoute,
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
        const groupList = new GroupList(groups);
        this.route.params
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((params) => {
            const newGroupKey = params['key'] || groupList.getInbox();
            this.groupName = groupList.getName(newGroupKey);
            if(this.groupKey !== newGroupKey) {
              this.groupKey = newGroupKey;
              const query = {query: {orderByChild: 'done', equalTo: false}};
              this.db.getItems(`/todos/${this.groupKey}`, query)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe((snapshots: any[]) => {
                  this.todos = [];
                  snapshots.forEach((snapshot: any) => {
                    this.todos.push(
                      new Todo(snapshot.payload.val()).setKey(snapshot.key)
                    );
                  });
                });
            }
          });
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
