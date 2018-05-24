import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as moment from 'moment';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';
import { GroupList } from '../../model/group-list';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  header: string;
  title: string;
  groupKey: string;
  due: string;
  assignee: string;
  members: any[];
  repeatType: number = 0;
  repeatDay: any = {};
  dayOfWeek = new FormControl();
  week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  selectedDays: Array<string> = [];
  repeatInterval: number = 1;
  repeatUnit: string = 'days';
  intervals: number[];
  groups: Group[];
  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TodoFormComponent>
  ) { }

  ngOnInit() {
    this.groups = this.data.groups;
    const groupList = new GroupList(this.groups);
    if(this.data.type === 'create') {
      this.header = 'Add Todo';
      this.groupKey = this.data.myGroupKey || groupList.getInbox();
      const now = moment();
      now.minutes(Math.ceil(now.minutes() / 5) * 5).seconds(0);
      this.due = now.format('YYYY-MM-DDTHH:mm');
      this.assignee = this.data.userId;
    } else if(this.data.type === 'edit') {
      this.header = 'Edit Todo';
      this.title = this.data.todo.title;
      this.groupKey = this.data.todo.groupKey;
      this.due = this.data.todo.due ? moment(this.data.todo.due).format('YYYY-MM-DDTHH:mm') : null;
      this.assignee = this.data.todo.assignee;
      this.repeatType = this.data.todo.repeatType;
      this.repeatInterval = this.data.todo.repeatInterval || 1;
      this.repeatUnit = this.data.todo.repeatUnit || 'days';
      this.selectedDays = this.data.todo.repeatDay ? Object.keys(this.data.todo.repeatDay) : [];
    }
    this.intervals = Array.from(new Array(30)).map((v,i)=> i + 1);
    this.setGroupMembers();
    this.result = {
      type: 'cancel',
      data: null
    };
  }

  create() {
    if (this.title) {
      if(this.repeatType === 1) {
        if(this.selectedDays.length) {
          this.selectedDays.forEach(day => this.repeatDay[day] = true);
          this.repeatUnit = 'weeks';
        } else {
          this.repeatType = 0;
        }
      }
      const createdTodo = new Todo({
        title: this.title,
        groupKey: this.groupKey,
        due: this.due,
        assignee: this.assignee,
        repeatType: this.repeatType,
        repeatDay: this.repeatDay,
        repeatInterval: this.repeatInterval,
        repeatUnit: this.repeatUnit
      });

      this.result.type = 'create';
      this.result.data = createdTodo;
      this.dialogRef.close(this.result);
    }
  }

  update() {
    if (this.title) {
      if(this.repeatType === 1) {
        if(this.selectedDays.length) {
          this.selectedDays.forEach(day => this.repeatDay[day] = true);
          this.repeatUnit = 'weeks';
        } else {
          this.repeatType = 0;
        }
      }
      const editedTodo = new Todo({
        title: this.title,
        groupKey: this.groupKey,
        due: this.due,
        assignee: this.assignee,
        repeatType: this.repeatType,
        repeatDay: this.repeatDay,
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

  skip() {
    let newDue;
    const originDue = moment(this.due);
    switch(this.repeatType) {
      case 0:
        break;
      case 1:
        const now = moment();
        newDue = now.isBefore(this.due) ? originDue : now;
        do {
          newDue.add(1, 'days');
        } while(this.selectedDays.indexOf(this.week[newDue.day()]) === -1);
        newDue.hours(originDue.get('hour'));
        newDue.minutes(originDue.get('minute'));
        newDue.seconds(0);
        break;
      case 2:
        newDue = moment(this.due);
        newDue.add(this.repeatInterval, this.repeatUnit);
        break;
      case 3:
        newDue = moment();
        newDue.hours(originDue.get('hour'));
        newDue.minutes(originDue.get('minute'));
        newDue.seconds(0);
        newDue.add(this.repeatInterval, this.repeatUnit);
        break;
      default:
        break;
    }
    this.due = newDue.format('YYYY-MM-DDTHH:mm');
  }

  delete() {
    this.result.type = 'delete';
    this.dialogRef.close(this.result);
  }

  cancel() {
    this.dialogRef.close(this.result);
  }

  setGroupMembers() {
    const index = this.groups.findIndex(({key}) => key === this.groupKey);
    if(index >= 0) {
      const members = this.groups[index].members;
      this.members = [];
      for(let key of Object.keys(members)) {
        this.members.push({key: key, name: members[key].name});
      }
    }
  }

}
