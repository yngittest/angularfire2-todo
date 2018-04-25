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
  assignee: string;
  members: any[];
  repeatType: number = 0;
  repeatInterval: number = 1;
  repeatUnit: string = 'days';
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
    this.groupKey = this.data.myGroupKey || this.group.getInbox();
    this.assignee = this.data.userId;
    this.setIntervals();
    this.setGroups();
    this.setGroupMembers();
  }

  create() {
    if (this.title) {
      const createdTodo = new Todo({
        title: this.title,
        groupKey: this.groupKey,
        assignee: this.assignee,
        due: this.due,
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

  setIntervals() {
    this.intervals = Array.from(new Array(30)).map((v,i)=> i + 1);
  }

  setGroups() {
    this.groups = this.group.getGroups();
  }

  setGroupMembers() {
    const index = this.groups.findIndex(({key}) => key === this.groupKey);
    const members = this.groups[index].members;
    this.members = [];
    for(let key of Object.keys(members)) {
      this.members.push({key: key, name: members[key].name});
    }
  }

}
