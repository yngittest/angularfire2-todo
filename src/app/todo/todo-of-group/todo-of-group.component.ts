import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as moment from 'moment';

import { Todo } from '../../model/todo';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-of-group',
  templateUrl: './todo-of-group.component.html',
  styleUrls: ['./todo-of-group.component.css'],
})
export class TodoOfGroupComponent implements OnInit, OnDestroy {
  userId: string;
  todos: Todo[];
  myGroupKey: string;
  myGroupName: string;
  subscription: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private db: FirebaseDbService,
    private group: GroupService
  ) { }

  ngOnInit() {
    this.auth.uid$.subscribe(uid => {
      this.userId = uid;
    });
    this.route.params.subscribe((params) => {
      this.myGroupKey = params['key'];
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

  addTodo(todo: Todo) {
    this.db.addItem(`todos/${todo.groupKey}`, todo.key, todo.data);
    if (todo.groupKey !== this.myGroupKey) {
      this.router.navigate([`/groups/${todo.groupKey}`]);
    }
  }

  updateTodo(todo: Todo) {
    todo.completed = todo.done ? moment().format('YYYY-MM-DDTHH:mm') : null;
    this.db.updateItem(`todos/${todo.groupKey}`, todo.key, todo.data);
    if(todo.repeatType !== 0) {
      this.repeatTodo(todo);
    }
  }

  editTodo(todo: Todo) {
    if (todo.groupKey === this.myGroupKey) {
      this.db.updateItem(`todos/${todo.groupKey}`, todo.key, todo.data);
    } else {
      this.db.deleteItem(`todos/${this.myGroupKey}`, todo.key);
      this.db.addItem(`todos/${todo.groupKey}`, todo.key, todo.data);
      this.router.navigate([`/groups/${todo.groupKey}`]);
    }
  }

  deleteTodo(todo: Todo) {
    this.db.deleteItem(`todos/${todo.groupKey}`, todo.key);
  }

  repeatTodo(todo: Todo) {
    let newDue;
    if(todo.repeatType === 1) {
      newDue = moment(todo.due);
    } else if(todo.repeatType === 2) {
      newDue = moment(todo.completed);
      newDue.minutes(Math.ceil(newDue.minutes() / 5) * 5);
      newDue.seconds(0);
    }
    newDue.add(todo.repeatInterval, todo.repeatUnit);

    todo.due = newDue.format('YYYY-MM-DDTHH:mm');
    todo.done = false;
    todo.completed = null;

    this.db.addItem(`todos/${todo.groupKey}`, null, todo.data);
  }

}
