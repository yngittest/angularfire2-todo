import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';

import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  @Input() userId: string;
  @Input() groups: Group[];
  @Input() groupKey: string;

  @Output() onCreate = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(TodoFormComponent, {
      data: {
        type: 'create',
        userId: this.userId,
        groups: this.groups,
        myGroupKey: this.groupKey,
      },
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(result.type === 'create') {
          this.onCreate.emit(result.data);
        }
      }
    });
  }

}
