import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { Todo } from '../../model/todo';

import { AuthService } from '../../service/auth/auth.service';
import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';

@Component({
  selector: 'app-all-todo',
  templateUrl: './all-todo.component.html',
  styleUrls: ['./all-todo.component.css']
})
export class AllTodoComponent implements OnInit {
  userId: string;
  todos: Todo[];
  groups: any[];
  name: string;
  done: boolean;

  constructor(private route: ActivatedRoute, private auth: AuthService, private db: FirebaseDbService) { }

  ngOnInit() {
    this.route.data.subscribe(obj => {
      this.name = obj['name'];
      this.done = obj['done'];
    });

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

  addTodo(todo: Todo) {
    this.db.addItem(`todos/${todo.groupKey}`, todo.key, todo.data);
  }

  updateTodo(todo: Todo) {
    todo.completed = todo.done ? Date.now() : null;
    this.db.updateItem(`todos/${todo.groupKey}`, todo.key, todo.data);
    if(todo.repeatType !== 0) {
      this.repeatTodo(todo);
    }
  }

  editTodo(todo: Todo) {
    if (todo.data.groupKey === todo.beforeGroupKey) {
      this.db.updateItem(`todos/${todo.groupKey}`, todo.key, todo.data);
    } else {
      this.db.deleteItem(`todos/${todo.beforeGroupKey}`, todo.key);
      this.db.addItem(`todos/${todo.groupKey}`, todo.key, todo.data);
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

    todo.due = Date.parse(newDue);
    todo.done = false;
    todo.completed = null;

    this.db.addItem(`todos/${todo.groupKey}`, null, todo.data);
  }

}
