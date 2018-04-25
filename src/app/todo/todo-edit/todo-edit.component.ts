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
  assignee: string;
  members: any[];
  repeatType: number = 0;
  repeatInterval: number = 1;
  repeatUnit: string = 'days';
  intervals: number[];
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
    this.due = moment(this.data.todo.due).format('YYYY-MM-DDTHH:mm');
    this.assignee = this.data.todo.assignee;
    this.repeatType = this.data.todo.repeatType;
    this.repeatInterval = this.data.todo.repeatInterval || 1;
    this.repeatUnit = this.data.todo.repeatUnit || 'days';
    this.setIntervals();
    this.setGroups();
    this.setGroupMembers();
    this.result = {
      type: 'cancel',
      data: null
    };
  }

  update() {
    if (this.title) {
      const editedTodo = new Todo({
        title: this.title,
        groupKey: this.groupKey,
        due: this.due,
        assignee: this.assignee,
        repeatType: this.repeatType,
        repeatInterval: this.repeatInterval,
        repeatUnit: this.repeatUnit,
        done: this.data.todo.done,
        completed: this.data.todo.completed
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
