import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Todo } from '../../model/todo';
import { Group } from '../../model/group';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title: string;
  due: string;
  groupKey: string;

  @Input() groups: Group[];

  @Output() submit = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
    this.due = moment().format('YYYY-MM-DDTHH:mm');
  }

  create() {
    if(this.title) {
      let createdTodo: Todo;

      let inputDue: number;
      if(this.due) {
        inputDue = Date.parse(this.due);
      } else {
        inputDue = null;
      }

      let inputGroupKey: string;
      if(this.groupKey) {
        inputGroupKey = this.groupKey;
      } else {
        inputGroupKey = this.groups[0].key;
      }

      createdTodo = new Todo(this.title, inputGroupKey, inputDue);
      this.submit.emit(createdTodo);
    }
  }
}
