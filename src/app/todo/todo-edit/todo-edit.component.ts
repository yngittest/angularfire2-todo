import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Todo } from '../../model/todo';
import { Group } from '../../model/group';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  title: string;
  due: string;
  groupKey: string;
  groups: Group[];

  @Input() todo: Todo;

  @Output() edited = new EventEmitter<Todo>();

  constructor(private group: GroupService) { }

  ngOnInit() {
    this.title = this.todo.data.title;
    this.groupKey = this.todo.data.groupKey;
    this.groups = this.group.getGroups();
    this.due = moment(this.todo.data.due).format('YYYY-MM-DDTHH:mm');
  }

  update() {
    if (this.title) {
      let editedTodo: Todo;

      let inputDue: number;
      if (this.due) {
        inputDue = Date.parse(this.due);
      } else {
        inputDue = null;
      }

      let inputGroupKey: string;
      if (this.groupKey) {
        inputGroupKey = this.groupKey;
      } else {
        inputGroupKey = this.groups[0].key;
      }

      editedTodo = new Todo(this.title, inputGroupKey, inputDue, this.todo.data.done);
      editedTodo.setKey(this.todo.key);
      editedTodo.setBeforeGroupKey(this.todo.data.groupKey);
      this.edited.emit(editedTodo);
    }
  }

  cancel() {
    this.edited.emit();
  }
}
