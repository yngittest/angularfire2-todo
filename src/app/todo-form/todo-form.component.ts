import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title: string;
  due: string;

  @Output() submit = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
    this.due = moment().format('YYYY-MM-DDTHH:mm');
  }

  create() {
    if (this.title) {
      let todo: Todo;
      if (this.due) {
        todo = new Todo(this.title, Date.parse(this.due));
      } else {
        todo = new Todo(this.title);
      }
      this.submit.emit(todo);
    }
  }
}
