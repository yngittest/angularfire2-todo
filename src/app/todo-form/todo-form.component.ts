import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title: string;
  @Output() submit = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  create() {
    if (this.title) {
      const todo: Todo = new Todo(this.title);
      this.submit.emit(todo);
    }
  }

}
