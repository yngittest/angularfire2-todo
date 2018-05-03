import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onEdit = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.onUpdate.emit(this.todo);
  }

  edit() {
    this.onEdit.emit(this.todo);
  }

}
