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
  groupKey: string;
  due: string;
  repeatType: number = 0;
  repeatInterval: number = 1;
  repeatUnit: string = 'days';
  groups: Group[];
  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TodoEditComponent>,
    private group: GroupService
  ) { }

  ngOnInit() {
    this.title = this.data.todo.title;
    this.groupKey = this.data.todo.groupKey;
    this.groups = this.group.getGroups();
    this.repeatType = this.data.todo.repeatType;
    this.repeatInterval = this.data.todo.repeatInterval || 1;
    this.repeatUnit = this.data.todo.repeatUnit || 'days';
    this.due = moment(this.data.todo.due).format('YYYY-MM-DDTHH:mm');
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

      editedTodo = new Todo({
        title: this.title,
        groupKey: inputGroupKey,
        due: inputDue,
        repeatType: this.repeatType,
        repeatInterval: this.repeatInterval,
        repeatUnit: this.repeatUnit,
        done: this.data.todo.done
      });
      editedTodo.setKey(this.data.todo.key);
      editedTodo.setBeforeGroupKey(this.data.todo.groupKey);

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
