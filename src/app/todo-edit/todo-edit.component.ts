import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  editedTodo: Todo;

  @Input() todo: Todo;

  @Output() edited = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
    this.editedTodo = new Todo(this.todo.data.title, this.todo.data.done, this.todo.data.due);
    this.editedTodo.key = this.todo.key;
  }

  update() {
    this.edited.emit(this.editedTodo);
  }

  cancel() {
    this.edited.emit();
  }

}
