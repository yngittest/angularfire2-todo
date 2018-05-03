import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Todo } from '../../model/todo';

import { FirebaseDbService } from '../../service/firebase-db/firebase-db.service';

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.css']
})
export class TodoManageComponent implements OnInit {
  userId: string;

  constructor(
    public db: FirebaseDbService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  addTodo(todo: Todo) {
    this.db.addItem(`todos/${todo.groupKey}`, todo.key, todo.data);
    this.router.navigate([`/groups/${todo.groupKey}`]);
  }

  updateTodo(todo: Todo) {
    const updatedTodo = todo.update(this.userId);
    this.db.updateItem(`todos/${todo.groupKey}`, todo.key, todo.data);
    if(todo.done) {
      const repeatedTodo = todo.repeat();
      if(repeatedTodo) {
        this.db.addItem(`todos/${repeatedTodo.groupKey}`, null, repeatedTodo.data);
      }
    }
  }

  editTodo(todo: Todo) {
    if (todo.groupKey === todo.beforeGroupKey) {
      this.db.updateItem(`todos/${todo.groupKey}`, todo.key, todo.data);
    } else {
      this.db.deleteItem(`todos/${todo.beforeGroupKey}`, todo.key);
      this.db.addItem(`todos/${todo.groupKey}`, todo.key, todo.data);
    }
    this.router.navigate([`/groups/${todo.groupKey}`]);
  }

  deleteTodo(todo: Todo) {
    this.db.deleteItem(`todos/${todo.groupKey}`, todo.key);
  }

}
