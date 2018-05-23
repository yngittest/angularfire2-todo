import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators/takeUntil";

import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { TodoManageComponent } from '../todo-manage/todo-manage.component';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-completed',
  templateUrl: './todo-completed.component.html',
  styleUrls: ['./todo-completed.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
})
export class TodoCompletedComponent extends TodoManageComponent implements OnInit, OnDestroy {
  userId: string;
  groups: Group[];
  groupSets: any[];
  todos: Todo[];
  sort = {key: 'completed', desc: true};
  startAt: string;
  endAt: string;
  query: any;
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

    this.startAt = moment().subtract(6, 'days').format();
    this.endAt = moment().format();

    this.group.groups$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(groups => {
        this.groups = groups;
        this.groupSets = [];
        groups.forEach(group => {
          const groupSet = {key: group.key, todos: []};
          this.query = this.db.filterByPeriod(`/todos/${group.key}`, 'completed');
          this.filterTodos();
          this.query.items$
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

  filterTodos() {
    const startAt = moment(this.startAt).startOf('day').format('YYYY-MM-DDTHH:mm');
    const endAt = moment(this.endAt).endOf('day').format('YYYY-MM-DDTHH:mm');
    this.query.filterBy(startAt, endAt);
  }

}
