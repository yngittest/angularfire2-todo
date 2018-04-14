import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as moment from 'moment';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  title: string;
  groupKey: string;
  due: string;
  repeatType: number = 0;
  repeatInterval: number = 1;
  repeatUnit: string = 'days';
  defaultGroupKey: string;
  groups: Group[];
  intervals: number[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TodoFormComponent>,
    private group: GroupService,
  ) { }

  ngOnInit() {
    const now = moment();
    now.minutes(Math.ceil(now.minutes() / 5) * 5);
    now.seconds(0);
    this.due = now.format('YYYY-MM-DDTHH:mm');
    this.groupKey = this.data.myGroupKey;
    this.groups = this.group.getGroups();
    if (this.data.myGroupKey) {
      this.defaultGroupKey = this.data.myGroupKey;
    } else {
      this.defaultGroupKey = this.group.getInbox()
    }
    this.intervals = Array.from(new Array(30)).map((v,i)=> i + 1);
  }

  create() {
    if (this.title) {
      let createdTodo: Todo;

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
        inputGroupKey = this.defaultGroupKey;
      }

      createdTodo = new Todo({
        title: this.title,
        groupKey: inputGroupKey,
        due: inputDue,
        repeatType: this.repeatType,
        repeatInterval: this.repeatInterval,
        repeatUnit: this.repeatUnit
      });
      this.dialogRef.close(createdTodo);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
