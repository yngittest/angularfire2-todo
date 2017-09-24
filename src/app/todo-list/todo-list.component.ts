import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../class/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[];

  @Output() updateOutput = new EventEmitter<Todo>();
  @Output() deleteOutput = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  update(todo: Todo) {
    this.updateOutput.emit(todo);
  }

  delete(todo: Todo) {
    this.deleteOutput.emit(todo);
  }

}
