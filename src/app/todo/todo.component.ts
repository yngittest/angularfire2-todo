import { Component, OnInit } from '@angular/core';
import { Todo } from '../class/todo';

import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.getItems('/todos').subscribe((snapshots: any[]) => {
      this.todos = [];
      snapshots.forEach((snapshot: any) => {
        this.todos.push(new Todo(snapshot.title, snapshot.done, snapshot.due).setKey(snapshot));
      });
    });
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
