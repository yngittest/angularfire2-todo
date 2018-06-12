import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';

import { TodoShareComponent } from '../todo-share/todo-share.component';

@Component({
  selector: 'app-todo-groupby',
  templateUrl: './todo-groupby.component.html',
  styleUrls: ['./todo-groupby.component.css']
})
export class TodoGroupbyComponent implements OnInit, OnChanges {
  todoTitlesOfGroups: any[];

  @Input() userId: string;
  @Input() groups: Group[];
  @Input() groupSets: any[];
  @Input() members: any[];
  @Input() sort: any;

  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onEdit = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.todoTitlesOfGroups = [];
    this.groupSets.forEach(groupSet => {
      const todoTitlesOfGroup = {group: groupSet.name, todoTitles: []};
      groupSet.todos.forEach(todo => {
        const index = todoTitlesOfGroup.todoTitles.findIndex(({title}) => title === todo.title);
        if (index < 0) {
          todoTitlesOfGroup.todoTitles.push({title: todo.title, todos: [todo]});
        } else {
          todoTitlesOfGroup.todoTitles[index].todos.push(todo);
        }
      });
      todoTitlesOfGroup.todoTitles.forEach(todoTitle => {
        todoTitle['users'] = {};
        this.members.forEach(member => {
          todoTitle.users[member.key] = {
            name: member.name,
            count: 0
          };
        });
        todoTitle.todos.forEach(todo => {
          todoTitle.users[todo.completedBy].count++;
        });
      });
      this.todoTitlesOfGroups.push(todoTitlesOfGroup);
    });
  }

  updateTodo(todo: Todo) {
    this.onUpdate.emit(todo);
  }

  editTodo(todo: Todo) {
    this.onEdit.emit(todo);
  }

  deleteTodo(todo: Todo) {
    this.onDelete.emit(todo);
  }

  openDialog(todoTitle: any) {
    let dialogRef = this.dialog.open(TodoShareComponent, {
      data: {
        userId: this.userId,
        groups: this.groups,
        sort: this.sort,
        todoTitle: todoTitle
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(result.type === 'update') {
          this.onUpdate.emit(result.data);
        } else if(result.type === 'edit') {
          this.onEdit.emit(result.data);
        } else if(result.type === 'delete') {
          this.onDelete.emit(result.data);
        }
      }
    });
  }

}
