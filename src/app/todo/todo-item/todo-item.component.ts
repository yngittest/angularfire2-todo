import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  expired: boolean;
  dateformat: string;

  @Input() todo: Todo;

  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onEdit = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
    if(this.todo.due) {
      this.expired = moment().isAfter(this.todo.due + '+09:00');
      const isToday = moment().isSame(this.todo.due + '+09:00', 'day');
      if(isToday) {
        this.dateformat = 'H:mm';
      } else {
        this.dateformat = 'yyyy/M/d H:mm';
      }
    }
  }

  update() {
    this.onUpdate.emit(this.todo);
  }

  edit() {
    this.onEdit.emit(this.todo);
  }

}
