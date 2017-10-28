import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  title: string;
  due: string;

  @Input() todo: Todo;

  @Output() edited = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
    this.title = this.todo.data.title;
    this.due = moment(this.todo.data.due).format('YYYY-MM-DDTHH:mm');
  }

  update() {
    if (this.title) {
      let editedTodo: Todo;
      if (this.due) {
        editedTodo = new Todo(this.title, this.todo.data.done, Date.parse(this.due));
      } else {
        editedTodo = new Todo(this.title, this.todo.data.done);
      }
      editedTodo.key = this.todo.key;
      this.edited.emit(editedTodo);
    }
  }

  cancel() {
    this.edited.emit();
  }
}
