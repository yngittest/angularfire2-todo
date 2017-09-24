import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  selected: Todo;

  @Input() todos: Todo[];

  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();

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
    this.selected = todo;
  }

  onEdited(todo: Todo) {
    if(todo) {
      this.update(todo);
    }
    this.selected = null;
  }

}
