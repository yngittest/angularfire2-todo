import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Todo } from '../../model/todo';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  selected: Todo;

  @Input() todos: Todo[];
  @Input() groupKey: string;

  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onEdit = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();

  constructor( public dialog: MatDialog) { }

  ngOnInit() {
  }

  updateTodo(todo: Todo) {
    this.onUpdate.emit(todo);
  }

  editTodo(todo: Todo) {
    this.selected = todo;
  }

  openDialog() {
    let dialogRef = this.dialog.open(TodoEditComponent, {
      data: { todo: this.selected },
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.type === 'update') {
        this.onEdit.emit(result.data);
      } else if(result.type === 'delete') {
        this.onDelete.emit(this.selected);
      }
      this.selected = null;
    });
  }

}
