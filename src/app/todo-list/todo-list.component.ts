import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[];

  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();
  @Output() onEdit = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  update(todo: Todo) {
    this.onUpdate.emit(todo);
  }

  delete(todo: Todo) {
    this.onDelete.emit(todo);
  }

  edit(todo: Todo) {
    this.onEdit.emit(todo);
  }

}
