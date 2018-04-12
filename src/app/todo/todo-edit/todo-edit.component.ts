import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TodoEditComponent>,
    private group: GroupService
  ) { }

  ngOnInit() {
    this.title = this.data.todo.data.title;
    this.groupKey = this.data.todo.data.groupKey;
    this.groups = this.group.getGroups();
    this.due = moment(this.data.todo.data.due).format('YYYY-MM-DDTHH:mm');
    this.result = {
      type: 'cancel',
      data: null
    };
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

      editedTodo = new Todo(this.title, inputGroupKey, inputDue, this.data.todo.data.done);
      editedTodo.setKey(this.data.todo.key);
      editedTodo.setBeforeGroupKey(this.data.todo.data.groupKey);

      this.result.type = 'update';
      this.result.data = editedTodo;
      this.dialogRef.close(this.result);
    }
  }

  delete() {
    this.result.type = 'delete';
    this.dialogRef.close(this.result);
  }

  cancel() {
    this.dialogRef.close(this.result);
  }

}
