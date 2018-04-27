import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Todo } from '../../model/todo';
import { TodoManageComponent } from '../todo-manage/todo-manage.component';

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
  todos: Todo[];
  myGroupKey: string;
  myGroupName: string;
  subscription: any;

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
    this.auth.uid$.subscribe(uid => {
      this.userId = uid;
    });
    this.route.params.subscribe((params) => {
      this.myGroupKey = params['key'] || this.group.getInbox();
      const query = {
        query: {
          orderByChild: 'done',
          equalTo: false
        }
      };
      this.subscription = this.db.getItems(`/todos/${this.myGroupKey}`, query).subscribe((snapshots: any[]) => {
        this.todos = [];
        snapshots.forEach((snapshot: any) => {
          this.todos.push(
            new Todo(snapshot).setKey(snapshot.$key)
          );
        });
        this.myGroupName = this.group.getName(this.myGroupKey);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
