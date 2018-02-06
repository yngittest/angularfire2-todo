import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, OnChanges {
  myGroupName: string;

  @Input() todo: Todo;

  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();
  @Output() onEdit = new EventEmitter<Todo>();

  constructor(private group: GroupService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.myGroupName = this.group.getName(this.todo.data.groupKey);
  }

  update() {
    this.onUpdate.emit(this.todo);
  }

  delete() {
    this.onDelete.emit(this.todo);
  }

  edit() {
    this.onEdit.emit(this.todo);
  }

}
