import { Component, OnInit } from '@angular/core';

import { Todo } from '../model/todo';

import { FirebaseService } from '../service/firebase/firebase.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [
    FirebaseService
  ]
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  subscription: any;

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.subscription = this.firebase.getItems('/todos', { query: { orderByChild: 'due' }}).subscribe((snapshots: any[]) => {
      this.todos = [];
      snapshots.forEach((snapshot: any) => {
        this.todos.push(new Todo(snapshot.title, snapshot.groupKey, snapshot.due, snapshot.done).setKey(snapshot.$key));
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTodo(todo: Todo) {
    this.firebase.addItem(todo);
  }

  updateTodo(todo: Todo) {
    this.firebase.updateItem(todo);
  }

  deleteTodo(todo: Todo) {
    this.firebase.deleteItem(todo);
  }

}
