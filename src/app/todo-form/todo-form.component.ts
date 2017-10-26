import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title: string;
  due: Date;

  @Output() submit = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  create() {
    if (this.title) {
      let todo: Todo;
      if (this.due) {
        todo = new Todo(this.title, false, this.due.getTime());
      } else {
        todo = new Todo(this.title, false);
      }
      this.submit.emit(todo);
    }
  }

}
