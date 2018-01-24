import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../model/todo';
import { Group } from '../../model/group';
import { GroupService } from '../../service/group/group.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  myGroupName: string;
  groups: Group[];

  @Input() todo: Todo;

  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();
  @Output() onEdit = new EventEmitter<Todo>();

  constructor(private group: GroupService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.groups = this.group.getGroups();
    this.myGroupName = this.groups.filter(group => {
      return group.key == this.todo.data.groupKey;
    })[0].data.name;
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
