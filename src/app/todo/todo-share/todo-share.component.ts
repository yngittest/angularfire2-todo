import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todo-share',
  templateUrl: './todo-share.component.html',
  styleUrls: ['./todo-share.component.css']
})
export class TodoShareComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TodoShareComponent>
  ) { }

  ngOnInit() {
  }

  updateTodo(todo: Todo) {
    this.dialogRef.close({type: 'update', data: todo});
  }

  editTodo(todo: Todo) {
    this.dialogRef.close({type: 'edit', data: todo});
  }

  deleteTodo(todo: Todo) {
    this.dialogRef.close({type: 'delete', data: todo});
  }

}
