import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Todo } from '../../model/todo';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  @Input() groupKey: string;
  @Input() userId: string;

  @Output() onCreate = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(TodoFormComponent, {
      data: { myGroupKey: this.groupKey, userId: this.userId },
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onCreate.emit(result);
      }
    });
  }

}
