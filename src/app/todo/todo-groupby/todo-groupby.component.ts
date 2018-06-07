import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../model/todo';
import { Group } from '../../model/group';

@Component({
  selector: 'app-todo-groupby',
  templateUrl: './todo-groupby.component.html',
  styleUrls: ['./todo-groupby.component.css']
})
export class TodoGroupbyComponent implements OnInit, OnChanges {
  todoTitles: any[];

  @Input() userId: string;
  @Input() groups: Group[];
  @Input() groupSets: any[];
  @Input() members: any[];
  @Input() sort: any;

  @Output() onUpdate = new EventEmitter<Todo>();
  @Output() onEdit = new EventEmitter<Todo>();
  @Output() onDelete = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.todoTitles = [];
    this.groupSets.forEach(groupSet => {
      const todoTitlesOfGroup = [];
      groupSet.todos.forEach(todo => {
        const index = todoTitlesOfGroup.findIndex(({title}) => title === todo.title);
        if (index < 0) {
          todoTitlesOfGroup.push({title: todo.title, todos: [todo]});
        } else {
          todoTitlesOfGroup[index].todos.push(todo);
        }
      });
      todoTitlesOfGroup.forEach(todoTitle => {
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
      this.todoTitles = this.todoTitles.concat(todoTitlesOfGroup);
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

}
